/*
 * ECG Restful API
 *
 * TEXT 
 *
 * OpenAPI spec version: 1.0.0-oas3
 * Contact: vincent71497867@gmail.com
 * Generated by: https://github.com/swagger-api/swagger-codegen.git
 */
using System;
using System.IO;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.SwaggerGen;
using IO.Swagger.Filters;
using IO.Swagger.Security;

using Microsoft.AspNetCore.Authentication;

namespace IO.Swagger
{
    /// <summary>
    /// Startup
    /// </summary>
    public class Startup
    {
        private readonly IHostingEnvironment _hostingEnv;

        private IConfiguration Configuration { get; }

        /// <summary>
        /// Constructor
        /// </summary>
        /// <param name="env"></param>
        /// <param name="configuration"></param>
        public Startup(IHostingEnvironment env, IConfiguration configuration)
        {
            _hostingEnv = env;
            Configuration = configuration;
        }

        /// <summary>
        /// This method gets called by the runtime. Use this method to add services to the container.
        /// </summary>
        /// <param name="services"></param>
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services
                .AddMvc()
                .AddJsonOptions(opts =>
                {
                    opts.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                    opts.SerializerSettings.Converters.Add(new StringEnumConverter {
                        CamelCaseText = true
                    });
                })
                .AddXmlSerializerFormatters();

            services.AddAuthentication(ApiKeyAuthenticationHandler.SchemeName)
                .AddScheme<AuthenticationSchemeOptions, ApiKeyAuthenticationHandler>(ApiKeyAuthenticationHandler.SchemeName, null);


            services
                .AddSwaggerGen(c =>
                {
                    c.SwaggerDoc("1.0.0-oas3", new Info
                    {
                        Version = "1.0.0-oas3",
                        Title = "ECG Restful API",
                        Description = "ECG Restful API (ASP.NET Core 2.0)",
                        Contact = new Contact()
                        {
                           Name = "Swagger Codegen Contributors",
                           Url = "https://github.com/swagger-api/swagger-codegen",
                           Email = "vincent71497867@gmail.com"
                        },
                        TermsOfService = ""
                    });
                    c.CustomSchemaIds(type => type.FriendlyId(true));
                    c.DescribeAllEnumsAsStrings();
                    c.IncludeXmlComments($"{AppContext.BaseDirectory}{Path.DirectorySeparatorChar}{_hostingEnv.ApplicationName}.xml");
                    // Sets the basePath property in the Swagger document generated
                    c.DocumentFilter<BasePathFilter>("/v54dt/ecg_restful/1.0.0");

                    // Include DataAnnotation attributes on Controller Action parameters as Swagger validation rules (e.g required, pattern, ..)
                    // Use [ValidateModelState] on Actions to actually validate it in C# as well!
                    c.OperationFilter<GeneratePathParamsValidationFilter>();
                });
        }

        /// <summary>
        /// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        /// </summary>
        /// <param name="app"></param>
        /// <param name="env"></param>
        /// <param name="loggerFactory"></param>
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            app
                .UseMvc()
                .UseDefaultFiles()
                .UseStaticFiles()
                .UseSwagger()
                .UseSwaggerUI(c =>
                {
                    //TODO: Either use the SwaggerGen generated Swagger contract (generated from C# classes)
                    c.SwaggerEndpoint("/swagger/1.0.0-oas3/swagger.json", "ECG Restful API");

                    //TODO: Or alternatively use the original Swagger contract that's included in the static files
                    // c.SwaggerEndpoint("/swagger-original.json", "ECG Restful API Original");
                });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                //TODO: Enable production exception handling (https://docs.microsoft.com/en-us/aspnet/core/fundamentals/error-handling)
                // app.UseExceptionHandler("/Home/Error");
            }
        }
    }
}
