using System;
using System.Linq;
using System.Text.RegularExpressions;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace IO.Swagger.Filters
{
    /// <summary>
    /// BasePathFilter sets the base path of Swagger and adjusts individual URL paths.
    /// </summary>
    public class BasePathFilter : IDocumentFilter
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="BasePathFilter"/> class.
        /// </summary>
        /// <param name="basePath">Base path to set for the Swagger document.</param>
        /// <exception cref="ArgumentException">Thrown when <paramref name="basePath"/> is null or empty.</exception>
        public BasePathFilter(string basePath)
        {
            if (string.IsNullOrWhiteSpace(basePath))
            {
                throw new ArgumentException("Base path cannot be null or empty", nameof(basePath));
            }

            BasePath = basePath;
        }

        /// <summary>
        /// Gets the base path for the Swagger document.
        /// </summary>
        public string BasePath { get; }

        /// <summary>
        /// Applies the filter to the Swagger document.
        /// </summary>
        /// <param name="swaggerDoc">Swagger document to modify.</param>
        /// <param name="context">Filter context.</param>
        /// <exception cref="ArgumentNullException">Thrown when <paramref name="swaggerDoc"/> or <paramref name="context"/> is null.</exception>
        public void Apply(OpenApiDocument swaggerDoc, DocumentFilterContext context)
        {
            if (swaggerDoc == null) throw new ArgumentNullException(nameof(swaggerDoc));
            if (context == null) throw new ArgumentNullException(nameof(context));

            // Set the base path for the Swagger document
            swaggerDoc.Servers.Add(new OpenApiServer { Url = BasePath });

            // Adjust paths in the Swagger document
            var pathsToModify = swaggerDoc.Paths
                .Where(p => p.Key.StartsWith(BasePath))
                .ToList();

            foreach (var path in pathsToModify)
            {
                var newKey = Regex.Replace(path.Key, $"^{BasePath}", string.Empty);
                swaggerDoc.Paths.Remove(path.Key);
                   swaggerDoc.Paths.Add(newKey, path.Value);
            }
        }
    }
}
