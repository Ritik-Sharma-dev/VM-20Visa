case 0: // Page 1: Organization Name
          return (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Building className="w-16 h-16 mx-auto text-royal-blue-500 mb-4" />
                <h2 className="text-2xl font-bold text-cool-gray-800 mb-2">
                  What's your organization name?
                </h2>
                <p className="text-cool-gray-600">
                  Enter the official name of your immigration consultancy
                </p>
              </div>
              
              <div>
                <Label htmlFor="orgName" className="text-lg font-medium">Organization Name</Label>
                <Input
                  id="orgName"
                  value={formData.orgName || ""}
                  onChange={(e) => updateFormData("orgName", e.target.value)}
                  placeholder="VM Visa Immigration Services"
                  className={cn("text-lg h-14 mt-3", errors.orgName && "border-red-500")}
                />
                {errors.orgName && (
                  <p className="text-red-500 text-sm mt-2">{errors.orgName}</p>
                )}
              </div>
            </div>
          );

        case 1: // Page 2: Email Address
          return (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Mail className="w-16 h-16 mx-auto text-royal-blue-500 mb-4" />
                <h2 className="text-2xl font-bold text-cool-gray-800 mb-2">
                  Official Email Address
                </h2>
                <p className="text-cool-gray-600">
                  We'll check if this email is already registered
                </p>
              </div>
              
              <div>
                <Label htmlFor="email" className="text-lg font-medium">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData("email", e.target.value)}
                  placeholder="admin@yourorganization.com"
                  className={cn("text-lg h-14 mt-3", errors.email && "border-red-500")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2">{errors.email}</p>
                )}
              </div>
            </div>
          );

        case 2: // Page 3: Password Setup
          return (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <User className="w-16 h-16 mx-auto text-royal-blue-500 mb-4" />
                <h2 className="text-2xl font-bold text-cool-gray-800 mb-2">
                  Create Secure Password
                </h2>
                <p className="text-cool-gray-600">
                  Password must be at least 8 characters
                </p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="password" className="text-lg font-medium">Create Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => updateFormData("password", e.target.value)}
                    placeholder="••••••••"
                    className={cn("text-lg h-14 mt-3", errors.password && "border-red-500")}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-2">{errors.password}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="text-lg font-medium">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                    placeholder="•••��••••"
                    className={cn("text-lg h-14 mt-3", errors.confirmPassword && "border-red-500")}
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-2">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>
            </div>
          );

        case 3: // Page 4: Contact Information
          return (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Phone className="w-16 h-16 mx-auto text-royal-blue-500 mb-4" />
                <h2 className="text-2xl font-bold text-cool-gray-800 mb-2">
                  Contact Information
                </h2>
                <p className="text-cool-gray-600">
                  Primary phone number is required
                </p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="phone" className="text-lg font-medium">Phone Number (with country code)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className={cn("text-lg h-14 mt-3", errors.phone && "border-red-500")}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-2">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="alternatePhone" className="text-lg font-medium">Alternate Phone (Optional)</Label>
                  <Input
                    id="alternatePhone"
                    type="tel"
                    value={formData.alternatePhone || ""}
                    onChange={(e) => updateFormData("alternatePhone", e.target.value)}
                    placeholder="+1 (555) 987-6543"
                    className="text-lg h-14 mt-3"
                  />
                </div>

                <div>
                  <Label htmlFor="whatsappNumber" className="text-lg font-medium">WhatsApp Number (Optional)</Label>
                  <Input
                    id="whatsappNumber"
                    type="tel"
                    value={formData.whatsappNumber || ""}
                    onChange={(e) => updateFormData("whatsappNumber", e.target.value)}
                    placeholder="+1 (555) 555-5555"
                    className="text-lg h-14 mt-3"
                  />
                </div>
              </div>
            </div>
          );

        case 4: // Page 5: Basic Profile Info
          return (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Globe className="w-16 h-16 mx-auto text-royal-blue-500 mb-4" />
                <h2 className="text-2xl font-bold text-cool-gray-800 mb-2">
                  Basic Profile Information
                </h2>
                <p className="text-cool-gray-600">
                  Location and credentials
                </p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="countryHeadquarters" className="text-lg font-medium">Country of Headquarters</Label>
                  <select
                    id="countryHeadquarters"
                    value={formData.countryHeadquarters || ""}
                    onChange={(e) => updateFormData("countryHeadquarters", e.target.value)}
                    className={cn(
                      "w-full p-4 text-lg border border-cool-gray-300 rounded-xl focus:ring-2 focus:ring-royal-blue-500 mt-3",
                      errors.countryHeadquarters && "border-red-500"
                    )}
                  >
                    <option value="">Select Country</option>
                    {countryOptions.map((country) => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                  {errors.countryHeadquarters && (
                    <p className="text-red-500 text-sm mt-2">{errors.countryHeadquarters}</p>
                  )}
                </div>

                <div>
                  <Label className="text-lg font-medium">Operating Regions (Select all that apply)</Label>
                  <div className="mt-3 grid grid-cols-2 gap-3 max-h-48 overflow-y-auto border border-cool-gray-300 rounded-xl p-4">
                    {countryOptions.map((country) => (
                      <label key={country} className="flex items-center space-x-2 cursor-pointer">
                        <Checkbox
                          checked={formData.operatingRegions?.includes(country) || false}
                          onCheckedChange={(checked) => {
                            const current = formData.operatingRegions || [];
                            if (checked) {
                              updateFormData("operatingRegions", [...current, country]);
                            } else {
                              updateFormData("operatingRegions", current.filter(c => c !== country));
                            }
                          }}
                        />
                        <span className="text-sm">{country}</span>
                      </label>
                    ))}
                  </div>
                  {errors.operatingRegions && (
                    <p className="text-red-500 text-sm mt-2">{errors.operatingRegions}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="companyLogo" className="text-lg font-medium">Company Logo</Label>
                  <div className="mt-3 border-2 border-dashed border-cool-gray-300 rounded-xl p-6 text-center">
                    <Upload className="w-8 h-8 text-cool-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-cool-gray-600 mb-2">Upload PNG or JPG</p>
                    <input
                      type="file"
                      accept=".png,.jpg,.jpeg"
                      onChange={(e) => updateFormData("companyLogo", e.target.files?.[0] || null)}
                      className="hidden"
                      id="companyLogo"
                    />
                    <label
                      htmlFor="companyLogo"
                      className="cursor-pointer text-royal-blue-600 hover:text-royal-blue-700 font-medium"
                    >
                      Choose Logo
                    </label>
                    {formData.companyLogo && (
                      <p className="text-sm text-green-600 mt-2">✓ {formData.companyLogo.name}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="businessLicense" className="text-lg font-medium">Business License or Certificate</Label>
                  <div className="mt-3 border-2 border-dashed border-cool-gray-300 rounded-xl p-6 text-center">
                    <Upload className="w-8 h-8 text-cool-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-cool-gray-600 mb-2">Upload official license document</p>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => updateFormData("businessLicense", e.target.files?.[0] || null)}
                      className="hidden"
                      id="businessLicense"
                    />
                    <label
                      htmlFor="businessLicense"
                      className="cursor-pointer text-royal-blue-600 hover:text-royal-blue-700 font-medium"
                    >
                      Choose File
                    </label>
                    {formData.businessLicense && (
                      <p className="text-sm text-green-600 mt-2">✓ {formData.businessLicense.name}</p>
                    )}
                  </div>
                  {errors.businessLicense && (
                    <p className="text-red-500 text-sm mt-2">{errors.businessLicense}</p>
                  )}
                </div>
              </div>
            </div>
          );

        case 5: // Page 6: Detailed Company Info
          return (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Briefcase className="w-16 h-16 mx-auto text-royal-blue-500 mb-4" />
                <h2 className="text-2xl font-bold text-cool-gray-800 mb-2">
                  Detailed Company Information
                </h2>
                <p className="text-cool-gray-600">
                  Services and background details
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="yearEstablished" className="text-lg font-medium">Year of Establishment</Label>
                    <Input
                      id="yearEstablished"
                      type="number"
                      value={formData.yearEstablished || ""}
                      onChange={(e) => updateFormData("yearEstablished", e.target.value)}
                      placeholder="2020"
                      min="1900"
                      max="2024"
                      className={cn("text-lg h-14 mt-3", errors.yearEstablished && "border-red-500")}
                    />
                    {errors.yearEstablished && (
                      <p className="text-red-500 text-sm mt-2">{errors.yearEstablished}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="registrationNumber" className="text-lg font-medium">Registration/License Number</Label>
                    <Input
                      id="registrationNumber"
                      value={formData.registrationNumber || ""}
                      onChange={(e) => updateFormData("registrationNumber", e.target.value)}
                      placeholder="R123456789"
                      className={cn("text-lg h-14 mt-3", errors.registrationNumber && "border-red-500")}
                    />
                    {errors.registrationNumber && (
                      <p className="text-red-500 text-sm mt-2">{errors.registrationNumber}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="website" className="text-lg font-medium">Website URL (Optional)</Label>
                  <Input
                    id="website"
                    type="url"
                    value={formData.website || ""}
                    onChange={(e) => updateFormData("website", e.target.value)}
                    placeholder="https://www.yourorganization.com"
                    className="text-lg h-14 mt-3"
                  />
                </div>

                <div>
                  <Label className="text-lg font-medium">Visa Services Offered</Label>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    {visaServiceOptions.map((service) => (
                      <label key={service} className="flex items-center space-x-2 cursor-pointer">
                        <Checkbox
                          checked={formData.servicesOffered?.includes(service) || false}
                          onCheckedChange={(checked) => {
                            const current = formData.servicesOffered || [];
                            if (checked) {
                              updateFormData("servicesOffered", [...current, service]);
                            } else {
                              updateFormData("servicesOffered", current.filter(s => s !== service));
                            }
                          }}
                        />
                        <span className="text-sm">{service}</span>
                      </label>
                    ))}
                  </div>
                  {errors.servicesOffered && (
                    <p className="text-red-500 text-sm mt-2">{errors.servicesOffered}</p>
                  )}
                </div>

                <div>
                  <Label className="text-lg font-medium">Languages Supported</Label>
                  <div className="mt-3 grid grid-cols-3 gap-3 max-h-32 overflow-y-auto">
                    {languageOptions.map((language) => (
                      <label key={language} className="flex items-center space-x-2 cursor-pointer">
                        <Checkbox
                          checked={formData.languagesSupported?.includes(language) || false}
                          onCheckedChange={(checked) => {
                            const current = formData.languagesSupported || [];
                            if (checked) {
                              updateFormData("languagesSupported", [...current, language]);
                            } else {
                              updateFormData("languagesSupported", current.filter(l => l !== language));
                            }
                          }}
                        />
                        <span className="text-sm">{language}</span>
                      </label>
                    ))}
                  </div>
                  {errors.languagesSupported && (
                    <p className="text-red-500 text-sm mt-2">{errors.languagesSupported}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="companyOverview" className="text-lg font-medium">Brief Company Overview (max 300 words)</Label>
                  <textarea
                    id="companyOverview"
                    value={formData.companyOverview || ""}
                    onChange={(e) => updateFormData("companyOverview", e.target.value)}
                    placeholder="Describe your immigration consultancy, expertise, and what makes you unique..."
                    maxLength={300}
                    rows={4}
                    className={cn(
                      "w-full p-4 text-lg border border-cool-gray-300 rounded-xl focus:ring-2 focus:ring-royal-blue-500 mt-3 resize-none",
                      errors.companyOverview && "border-red-500"
                    )}
                  />
                  <p className="text-xs text-cool-gray-500 mt-1">
                    {(formData.companyOverview || "").length}/300 characters
                  </p>
                  {errors.companyOverview && (
                    <p className="text-red-500 text-sm mt-2">{errors.companyOverview}</p>
                  )}
                </div>
              </div>
            </div>
          );

        case 6: // Page 7: Representative Info
          return (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <User className="w-16 h-16 mx-auto text-royal-blue-500 mb-4" />
                <h2 className="text-2xl font-bold text-cool-gray-800 mb-2">
                  Authorized Representative
                </h2>
                <p className="text-cool-gray-600">
                  Primary contact person details
                </p>
              </div>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="repName" className="text-lg font-medium">Name</Label>
                  <Input
                    id="repName"
                    value={formData.repName || ""}
                    onChange={(e) => updateFormData("repName", e.target.value)}
                    placeholder="John Smith"
                    className={cn("text-lg h-14 mt-3", errors.repName && "border-red-500")}
                  />
                  {errors.repName && (
                    <p className="text-red-500 text-sm mt-2">{errors.repName}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="repDesignation" className="text-lg font-medium">Designation/Title</Label>
                  <Input
                    id="repDesignation"
                    value={formData.repDesignation || ""}
                    onChange={(e) => updateFormData("repDesignation", e.target.value)}
                    placeholder="Managing Director"
                    className={cn("text-lg h-14 mt-3", errors.repDesignation && "border-red-500")}
                  />
                  {errors.repDesignation && (
                    <p className="text-red-500 text-sm mt-2">{errors.repDesignation}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="repPhoto" className="text-lg font-medium">Profile Photo</Label>
                  <div className="mt-3 border-2 border-dashed border-cool-gray-300 rounded-xl p-6 text-center">
                    <Upload className="w-8 h-8 text-cool-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-cool-gray-600 mb-2">Upload profile photo</p>
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={(e) => updateFormData("repPhoto", e.target.files?.[0] || null)}
                      className="hidden"
                      id="repPhoto"
                    />
                    <label
                      htmlFor="repPhoto"
                      className="cursor-pointer text-royal-blue-600 hover:text-royal-blue-700 font-medium"
                    >
                      Choose Photo
                    </label>
                    {formData.repPhoto && (
                      <p className="text-sm text-green-600 mt-2">✓ {formData.repPhoto.name}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="repLinkedIn" className="text-lg font-medium">LinkedIn Profile URL (Optional)</Label>
                  <Input
                    id="repLinkedIn"
                    type="url"
                    value={formData.repLinkedIn || ""}
                    onChange={(e) => updateFormData("repLinkedIn", e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                    className="text-lg h-14 mt-3"
                  />
                </div>
              </div>
            </div>
          );

        case 7: // Page 8: Final Review & Confirmation
          return (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <Check className="w-16 h-16 mx-auto text-green-500 mb-4" />
                <h2 className="text-2xl font-bold text-cool-gray-800 mb-2">
                  Final Review & Confirmation
                </h2>
                <p className="text-cool-gray-600">
                  Please review your information before submitting
                </p>
              </div>
              
              <div className="bg-cool-gray-50 rounded-xl p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-cool-gray-700">Organization:</span>
                    <p className="text-cool-gray-900">{formData.orgName}</p>
                  </div>
                  <div>
                    <span className="font-medium text-cool-gray-700">Email:</span>
                    <p className="text-cool-gray-900">{formData.email}</p>
                  </div>
                  <div>
                    <span className="font-medium text-cool-gray-700">Phone:</span>
                    <p className="text-cool-gray-900">{formData.phone}</p>
                  </div>
                  <div>
                    <span className="font-medium text-cool-gray-700">Headquarters:</span>
                    <p className="text-cool-gray-900">{formData.countryHeadquarters}</p>
                  </div>
                  <div>
                    <span className="font-medium text-cool-gray-700">Established:</span>
                    <p className="text-cool-gray-900">{formData.yearEstablished}</p>
                  </div>
                  <div>
                    <span className="font-medium text-cool-gray-700">License #:</span>
                    <p className="text-cool-gray-900">{formData.registrationNumber}</p>
                  </div>
                  <div>
                    <span className="font-medium text-cool-gray-700">Representative:</span>
                    <p className="text-cool-gray-900">{formData.repName} - {formData.repDesignation}</p>
                  </div>
                  <div>
                    <span className="font-medium text-cool-gray-700">Services:</span>
                    <p className="text-cool-gray-900">{formData.servicesOffered?.join(', ')}</p>
                  </div>
                </div>
                
                {formData.companyOverview && (
                  <div>
                    <span className="font-medium text-cool-gray-700">Company Overview:</span>
                    <p className="text-cool-gray-900 mt-1">{formData.companyOverview}</p>
                  </div>
                )}
              </div>

              <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-xl">
                <Checkbox
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => updateFormData("agreeToTerms", checked)}
                  className={cn(errors.agreeToTerms && "border-red-500")}
                />
                <div>
                  <Label htmlFor="agreeToTerms" className="text-sm cursor-pointer leading-relaxed">
                    ✅ I confirm the details are correct and I agree to VM Visa's{" "}
                    <a href="#" className="text-royal-blue-600 hover:underline">terms</a>
                    {" "}and{" "}
                    <a href="#" className="text-royal-blue-600 hover:underline">privacy policy</a>.
                  </Label>
                  {errors.agreeToTerms && (
                    <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</p>
                  )}
                </div>
              </div>
            </div>
          );

        default:
          return <div>Invalid step</div>;