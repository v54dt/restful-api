/*
 * ECG Restful API
 *
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.0-oas3
 * Contact: vincent71497867@gmail.com
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
    public partial class RPNDeviceListDeviceList : IEquatable<RPNDeviceListDeviceList>
    { 
        /// <summary>
        /// Gets or Sets UIDDevice
        /// </summary>
        [Required]
        [DataMember(Name="UID_Device")]
        public int? UIDDevice { get; set; }

        /// <summary>
        /// Gets or Sets BLEName
        /// </summary>
        [DataMember(Name="BLE_Name")]
        public string BLEName { get; set; }

        /// <summary>
        /// Gets or Sets BATT
        /// </summary>
        [Required]
        [DataMember(Name="BATT")]
        public int? BATT { get; set; }

        /// <summary>
        /// Gets or Sets MRN
        /// </summary>
        [Required]
        [DataMember(Name="MRN")]
        public int? MRN { get; set; }

        /// <summary>
        /// Gets or Sets Name
        /// </summary>
        [Required]
        [DataMember(Name="Name")]
        public string Name { get; set; }

        /// <summary>
        /// Returns the string presentation of the object
        /// </summary>
        /// <returns>String presentation of the object</returns>
        public override string ToString()
        {
            var sb = new StringBuilder();
            sb.Append("class RPNDeviceListDeviceList {\n");
            sb.Append("  UIDDevice: ").Append(UIDDevice).Append("\n");
            sb.Append("  BLEName: ").Append(BLEName).Append("\n");
            sb.Append("  BATT: ").Append(BATT).Append("\n");
            sb.Append("  MRN: ").Append(MRN).Append("\n");
            sb.Append("  Name: ").Append(Name).Append("\n");
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
            return obj.GetType() == GetType() && Equals((RPNDeviceListDeviceList)obj);
        }

        /// <summary>
        /// Returns true if RPNDeviceListDeviceList instances are equal
        /// </summary>
        /// <param name="other">Instance of RPNDeviceListDeviceList to be compared</param>
        /// <returns>Boolean</returns>
        public bool Equals(RPNDeviceListDeviceList other)
        {
            if (ReferenceEquals(null, other)) return false;
            if (ReferenceEquals(this, other)) return true;

            return 
                (
                    UIDDevice == other.UIDDevice ||
                    UIDDevice != null &&
                    UIDDevice.Equals(other.UIDDevice)
                ) && 
                (
                    BLEName == other.BLEName ||
                    BLEName != null &&
                    BLEName.Equals(other.BLEName)
                ) && 
                (
                    BATT == other.BATT ||
                    BATT != null &&
                    BATT.Equals(other.BATT)
                ) && 
                (
                    MRN == other.MRN ||
                    MRN != null &&
                    MRN.Equals(other.MRN)
                ) && 
                (
                    Name == other.Name ||
                    Name != null &&
                    Name.Equals(other.Name)
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
                    if (UIDDevice != null)
                    hashCode = hashCode * 59 + UIDDevice.GetHashCode();
                    if (BLEName != null)
                    hashCode = hashCode * 59 + BLEName.GetHashCode();
                    if (BATT != null)
                    hashCode = hashCode * 59 + BATT.GetHashCode();
                    if (MRN != null)
                    hashCode = hashCode * 59 + MRN.GetHashCode();
                    if (Name != null)
                    hashCode = hashCode * 59 + Name.GetHashCode();
                return hashCode;
            }
        }

        #region Operators
        #pragma warning disable 1591

        public static bool operator ==(RPNDeviceListDeviceList left, RPNDeviceListDeviceList right)
        {
            return Equals(left, right);
        }

        public static bool operator !=(RPNDeviceListDeviceList left, RPNDeviceListDeviceList right)
        {
            return !Equals(left, right);
        }

        #pragma warning restore 1591
        #endregion Operators
    }
}
