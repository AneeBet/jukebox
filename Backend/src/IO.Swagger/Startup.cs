using System;
using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using IO.Swagger.Filters;

namespace IO.Swagger
{
    /// <summary>
    /// Startup class to configure services and the HTTP request pipeline.
    /// </summary>
    public class Startup
    {
        private readonly IWebHostEnvironment _hostingEnv;
        private IConfiguration Configuration { get; }

        /// <summary>
        /// Constructor for Startup.
        /// </summary>
        /// <param name="env">Hosting environment</param>
        /// <param name="configuration">Configuration</param>
        public Startup(IWebHostEnvironment env, IConfiguration configuration)
        {
            _hostingEnv = env ?? throw new ArgumentNullException(nameof(env));
            Configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }

        /// <summary>
        /// Configure services to the container.
        /// </summary>
        /// <param name="services">Service collection</param>
        public void ConfigureServices(IServiceCollection services)
        {
            services
                .AddControllers()
                .AddNewtonsoftJson(opts =>
                {
                    opts.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                    opts.SerializerSettings.Converters.Add(new StringEnumConverter(new CamelCaseNamingStrategy()));
                })
                .AddXmlSerializerFormatters();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "Music Album API",
                    Description = "Music Album API",
                    Contact = new OpenApiContact
                    {
                        Name = "Swagger Codegen Contributors",
                        Url = new Uri("https://github.com/swagger-api/swagger-codegen"),
                    },
                });

                c.CustomSchemaIds(type => type.FullName);
                c.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, $"{_hostingEnv.ApplicationName}.xml"));

                // Base path configuration
                string basePath = "/api";
                if (!string.IsNullOrWhiteSpace(basePath))
                {
                    c.DocumentFilter<BasePathFilter>(basePath);
                }

                // Include DataAnnotation attributes on Controller Action parameters as Swagger validation rules
                c.OperationFilter<GeneratePathParamsValidationFilter>();
            });
        }

        /// <summary>
        /// Configure the HTTP request pipeline.
        /// </summary>
        /// <param name="app">Application builder</param>
        /// <param name="env">Hosting environment</param>
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env == null) throw new ArgumentNullException(nameof(env));

            // Middleware configuration
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            // Ensure HTTPS redirection is uncommented if needed
            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Music Album API");
                // Optionally configure Swagger UI options
                c.RoutePrefix = string.Empty; // To serve the Swagger UI at the app's root
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
