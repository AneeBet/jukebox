/*
 * Music Album API
 *
 * API to manage music albums.
 *
 * OpenAPI spec version: 1.0.0
 * 
 * Generated by: https://github.com/swagger-api/swagger-codegen.git
 */
using System;
using System.Linq;
using System.IO;
using System.Text;
using System.Collections;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using Newtonsoft.Json;

namespace IO.Swagger.Models
{
    /// <summary>
    /// 
    /// </summary>
    [DataContract]
    public partial class InlineResponse201 : IEquatable<InlineResponse201>
    { 
        /// <summary>
        /// Gets or Sets Album
        /// </summary>

        [DataMember(Name="album")]
        public string Album { get; set; }

        /// <summary>
        /// Gets or Sets Artist
        /// </summary>

        [DataMember(Name="artist")]
        public string Artist { get; set; }

        /// <summary>
        /// Gets or Sets Songs
        /// </summary>

        [DataMember(Name="songs")]
        public List<string> Songs { get; set; }

        /// <summary>
        /// Returns the string presentation of the object
        /// </summary>
        /// <returns>String presentation of the object</returns>
        public override string ToString()
        {
            var sb = new StringBuilder();
            sb.Append("class InlineResponse201 {\n");
            sb.Append("  Album: ").Append(Album).Append("\n");
            sb.Append("  Artist: ").Append(Artist).Append("\n");
            sb.Append("  Songs: ").Append(Songs).Append("\n");
            sb.Append("}\n");
            return sb.ToString();
        }

        /// <summary>
        /// Returns the JSON string presentation of the object
        /// </summary>
        /// <returns>JSON string presentation of the object</returns>
        public string ToJson()
        {
            return JsonConvert.SerializeObject(this, Formatting.Indented);
        }

        /// <summary>
        /// Returns true if objects are equal
        /// </summary>
        /// <param name="obj">Object to be compared</param>
        /// <returns>Boolean</returns>
        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            if (ReferenceEquals(this, obj)) return true;
            return obj.GetType() == GetType() && Equals((InlineResponse201)obj);
        }

        /// <summary>
        /// Returns true if InlineResponse201 instances are equal
        /// </summary>
        /// <param name="other">Instance of InlineResponse201 to be compared</param>
        /// <returns>Boolean</returns>
        public bool Equals(InlineResponse201 other)
        {
            if (ReferenceEquals(null, other)) return false;
            if (ReferenceEquals(this, other)) return true;

            return 
                (
                    Album == other.Album ||
                    Album != null &&
                    Album.Equals(other.Album)
                ) && 
                (
                    Artist == other.Artist ||
                    Artist != null &&
                    Artist.Equals(other.Artist)
                ) && 
                (
                    Songs == other.Songs ||
                    Songs != null &&
                    Songs.SequenceEqual(other.Songs)
                );
        }

        /// <summary>
        /// Gets the hash code
        /// </summary>
        /// <returns>Hash code</returns>
        public override int GetHashCode()
        {
            unchecked // Overflow is fine, just wrap
            {
                var hashCode = 41;
                // Suitable nullity checks etc, of course :)
                    if (Album != null)
                    hashCode = hashCode * 59 + Album.GetHashCode();
                    if (Artist != null)
                    hashCode = hashCode * 59 + Artist.GetHashCode();
                    if (Songs != null)
                    hashCode = hashCode * 59 + Songs.GetHashCode();
                return hashCode;
            }
        }

        #region Operators
        #pragma warning disable 1591

        public static bool operator ==(InlineResponse201 left, InlineResponse201 right)
        {
            return Equals(left, right);
        }

        public static bool operator !=(InlineResponse201 left, InlineResponse201 right)
        {
            return !Equals(left, right);
        }

        #pragma warning restore 1591
        #endregion Operators
    }
}
