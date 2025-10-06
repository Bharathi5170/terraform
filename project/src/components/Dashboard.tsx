import React, { useState } from 'react';
import { 
  Code2, 
  Home,
  FileText,
  Image,
  DollarSign,
  Shield,
  User,
  LogOut,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Copy,
  Upload,
  Play,
  ExternalLink,
  MapPin,
  Key,
  X,
  TrendingDown,
  Target,
  PieChart,
  BarChart3,
  AlertCircle
} from 'lucide-react';

interface DashboardProps {
  onLogout: () => void;
}

type ActivePage = 'dashboard' | 'terraform-generator' | 'check-compliance' | 'image-to-terraform' | 'resource-optimization' | 'aws-well-architect';

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  const [activePage, setActivePage] = useState<ActivePage>('dashboard');
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  // Terraform Generator State
  const [terraformInput, setTerraformInput] = useState('');
  const [terraformOutput, setTerraformOutput] = useState('');
  const [terraformLoading, setTerraformLoading] = useState(false);

  // Check Compliance State
  const [complianceStandard, setComplianceStandard] = useState('');
  const [complianceCode, setComplianceCode] = useState('');
  const [complianceResults, setComplianceResults] = useState('');
  const [complianceLoading, setComplianceLoading] = useState(false);

  // Image to Terraform State
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [imageOutput, setImageOutput] = useState('');
  const [imageLoading, setImageLoading] = useState(false);

  // FinOps Optimizer State
  const [awsAccessKey, setAwsAccessKey] = useState('');
  const [awsSecretKey, setAwsSecretKey] = useState('');
  const [awsSessionToken, setAwsSessionToken] = useState('');
  const [region, setRegion] = useState('');
  const [saveCredentials, setSaveCredentials] = useState(false);
  const [optimizationResults, setOptimizationResults] = useState('');
  const [optimizationLoading, setOptimizationLoading] = useState(false);
  const [credentialsConnected, setCredentialsConnected] = useState(false);

  // Additional state for legacy code
  const [activeTab, setActiveTab] = useState('generator');
  const [description, setDescription] = useState('');
  const [provider, setProvider] = useState('aws');
  const [generatedCode, setGeneratedCode] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [finopsRegion, setFinopsRegion] = useState('');
  const [analysisPeriod, setAnalysisPeriod] = useState('30d');
  const [finopsResults, setFinopsResults] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleTerraformGenerate = () => {
    setTerraformLoading(true);
    // Simulate API call
    setTimeout(() => {
      setTerraformOutput(`# Generated Terraform Configuration
resource "aws_instance" "example" {
  ami           = "ami-0c55b159cbfafe1d0"
  instance_type = "t2.micro"
  
  tags = {
    Name = "ExampleInstance"
    Environment = "Production"
  }
}

resource "aws_security_group" "example" {
  name_prefix = "example-"
  
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}`);
      setTerraformLoading(false);
    }, 2000);
  };

  const handleComplianceCheck = () => {
    setComplianceLoading(true);
    setTimeout(() => {
      setComplianceResults(`Compliance Check Results for ${complianceStandard}:

✅ PASSED: Security groups have proper ingress rules
✅ PASSED: Resources are properly tagged
⚠️  WARNING: Instance type should use latest generation
❌ FAILED: Missing encryption for EBS volumes
✅ PASSED: IAM roles follow least privilege principle

Overall Score: 75/100
Recommendations:
1. Enable EBS encryption by default
2. Consider using t3.micro instead of t2.micro
3. Add backup policies for critical resources`);
      setComplianceLoading(false);
    }, 2000);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageToTerraform = () => {
    setImageLoading(true);
    setTimeout(() => {
      setImageOutput(`# Generated from Architecture Diagram
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true
  
  tags = {
    Name = "MainVPC"
  }
}

resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "us-west-2a"
  map_public_ip_on_launch = true
  
  tags = {
    Name = "PublicSubnet"
  }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id
  
  tags = {
    Name = "MainIGW"
  }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id
  
  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }
  
  tags = {
    Name = "PublicRouteTable"
  }
}`);
      setImageLoading(false);
    }, 2000);
  };

  const handleOptimizationAnalysis = () => {
    setOptimizationLoading(true);
    setTimeout(() => {
      setOptimizationResults(`Resource Optimization Analysis for ${region}:

💰 Cost Optimization Opportunities:
- Potential Monthly Savings: $2,847
- Right-size 12 over-provisioned instances
- Convert 8 instances to Reserved Instances
- Enable S3 Intelligent Tiering

⚡ Compute Optimization:
- 15 underutilized instances detected
- Recommended instance type changes:
  • t2.large → t3.medium (4 instances)
  • m5.xlarge → m5.large (3 instances)
- Enable auto-scaling for 6 workloads

📊 Performance Insights:
- Average CPU utilization: 23%
- Memory utilization: 45%
- Network utilization: 12%

🎯 Action Items:
1. Schedule instance right-sizing
2. Implement auto-scaling policies
3. Review storage optimization options`);
      setOptimizationLoading(false);
    }, 2000);
  };

  const handleConnectCredentials = () => {
    // Simulate credential validation
    setOptimizationLoading(true);
    setTimeout(() => {
      setCredentialsConnected(true);
      setOptimizationLoading(false);
    }, 1500);
  };

  const handleTestConnection = () => {
    // Simulate connection test
    alert('Connection test successful! AWS credentials are valid.');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const generateCode = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedCode(`# Generated Terraform Configuration
resource "aws_instance" "example" {
  ami           = "ami-0c55b159cbfafe1d0"
  instance_type = "t2.micro"
  
  tags = {
    Name = "ExampleInstance"
    Environment = "Production"
  }
}`);
      setIsGenerating(false);
    }, 2000);
  };

  const analyzeFinOps = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setFinopsResults('Analysis complete');
      setIsAnalyzing(false);
    }, 2000);
  };

  const renderContent = () => {
    switch (activePage) {
      case 'terraform-generator':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Terraform Code Generator</h2>
              <p className="text-gray-600 mb-6">Describe your infrastructure requirements and get production-ready Terraform code.</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Infrastructure Description
                  </label>
                  <textarea
                    value={terraformInput}
                    onChange={(e) => setTerraformInput(e.target.value)}
                    placeholder="Describe your infrastructure needs... (e.g., 'Create an EC2 instance with security group allowing HTTP traffic')"
                    className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>
                
                <button
                  onClick={handleTerraformGenerate}
                  disabled={!terraformInput.trim() || terraformLoading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
                >
                  <Play className="w-5 h-5" />
                  <span>{terraformLoading ? 'Generating...' : 'Generate Terraform Code'}</span>
                </button>
              </div>
            </div>

            {terraformOutput && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Generated Terraform Code</h3>
                  <button
                    onClick={() => copyToClipboard(terraformOutput)}
                    className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </button>
                </div>
                <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{terraformOutput}</code>
                </pre>
              </div>
            )}
          </div>
        );

      case 'check-compliance':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Compliance Checker</h2>
              <p className="text-gray-600 mb-6">Check your Terraform code against industry standards and best practices.</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Compliance Standard
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {['CIS Benchmark', 'PCI DSS', 'HIPAA', 'NIST'].map((standard) => (
                      <label key={standard} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input
                          type="radio"
                          name="compliance"
                          value={standard}
                          checked={complianceStandard === standard}
                          onChange={(e) => setComplianceStandard(e.target.value)}
                          className="text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-gray-700 font-medium">{standard}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Terraform Code
                  </label>
                  <textarea
                    value={complianceCode}
                    onChange={(e) => setComplianceCode(e.target.value)}
                    placeholder="Paste your Terraform code here..."
                    className="w-full h-40 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none font-mono text-sm"
                  />
                </div>
                
                <button
                  onClick={handleComplianceCheck}
                  disabled={!complianceStandard || !complianceCode.trim() || complianceLoading}
                  className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
                >
                  <Shield className="w-5 h-5" />
                  <span>{complianceLoading ? 'Checking...' : 'Check Compliance'}</span>
                </button>
              </div>
            </div>

            {complianceResults && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Compliance Analysis Dashboard</h3>
                
                {/* Top Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-600 text-sm font-medium">Passed</p>
                        <p className="text-2xl font-bold text-green-700">12</p>
                      </div>
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg p-4 border border-yellow-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-yellow-600 text-sm font-medium">Warnings</p>
                        <p className="text-2xl font-bold text-yellow-700">3</p>
                      </div>
                      <AlertTriangle className="w-8 h-8 text-yellow-500" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-4 border border-red-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-red-600 text-sm font-medium">Failed</p>
                        <p className="text-2xl font-bold text-red-700">2</p>
                      </div>
                      <X className="w-8 h-8 text-red-500" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-600 text-sm font-medium">Overall Score</p>
                        <p className="text-2xl font-bold text-blue-700">75%</p>
                      </div>
                      <Shield className="w-8 h-8 text-blue-500" />
                    </div>
                  </div>
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  {/* Pie Chart */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-md font-semibold text-gray-900 mb-4 text-center">Compliance Distribution</h4>
                    <div className="flex justify-center">
                      <div className="relative w-48 h-48">
                        <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 160 160">
                          {/* Passed - 70.6% (12/17) */}
                          <circle
                            cx="80"
                            cy="80"
                            r="60"
                            stroke="#10b981"
                            strokeWidth="20"
                            fill="none"
                            strokeDasharray={`${70.6 * 3.77} ${100 * 3.77}`}
                            className="transition-all duration-1000 ease-out"
                          />
                          {/* Warnings - 17.6% (3/17) */}
                          <circle
                            cx="80"
                            cy="80"
                            r="60"
                            stroke="#f59e0b"
                            strokeWidth="20"
                            fill="none"
                            strokeDasharray={`${17.6 * 3.77} ${100 * 3.77}`}
                            strokeDashoffset={`-${70.6 * 3.77}`}
                            className="transition-all duration-1000 ease-out delay-300"
                          />
                          {/* Failed - 11.8% (2/17) */}
                          <circle
                            cx="80"
                            cy="80"
                            r="60"
                            stroke="#ef4444"
                            strokeWidth="20"
                            fill="none"
                            strokeDasharray={`${11.8 * 3.77} ${100 * 3.77}`}
                            strokeDashoffset={`-${(70.6 + 17.6) * 3.77}`}
                            className="transition-all duration-1000 ease-out delay-600"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">17</div>
                            <div className="text-xs text-gray-500">Total Checks</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center mt-4 space-x-6">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">Passed (12)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">Warnings (3)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm text-gray-600">Failed (2)</span>
                      </div>
                    </div>
                  </div>

                  {/* Bar Chart */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-md font-semibold text-gray-900 mb-4 text-center">Category Scores</h4>
                    <div className="space-y-4">
                      {[
                        { name: 'Security Groups', score: 95, color: 'bg-green-500' },
                        { name: 'Resource Tagging', score: 85, color: 'bg-green-500' },
                        { name: 'IAM Policies', score: 90, color: 'bg-green-500' },
                        { name: 'Network Security', score: 75, color: 'bg-yellow-500' },
                        { name: 'Instance Types', score: 65, color: 'bg-yellow-500' },
                        { name: 'Encryption', score: 45, color: 'bg-red-500' }
                      ].map((category, index) => (
                        <div key={category.name} className="flex items-center space-x-3">
                          <div className="w-24 text-xs font-medium text-gray-700 truncate">
                            {category.name}
                          </div>
                          <div className="flex-1 bg-gray-200 rounded-full h-4 relative overflow-hidden">
                            <div 
                              className={`h-4 rounded-full transition-all duration-1000 ease-out ${category.color}`}
                              style={{ 
                                width: `${category.score}%`,
                                transitionDelay: `${index * 200}ms`
                              }}
                            ></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-xs font-semibold text-white mix-blend-difference">
                                {category.score}%
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Detailed Results */}
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-gray-600" />
                    <span>Detailed Analysis Report</span>
                  </h4>
                  <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                    <pre className="text-sm whitespace-pre-wrap text-gray-700">
                      {complianceResults}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 'image-to-terraform':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Image to Terraform</h2>
              <p className="text-gray-600 mb-6">Upload an architecture diagram and get corresponding Terraform code.</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Architecture Diagram
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                      <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </label>
                  </div>
                </div>

                {imagePreview && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preview
                    </label>
                    <div className="border border-gray-200 rounded-lg p-4">
                      <img 
                        src={imagePreview} 
                        alt="Architecture diagram preview" 
                        className="max-w-full h-auto max-h-64 mx-auto rounded-lg"
                      />
                    </div>
                  </div>
                )}
                
                <button
                  onClick={handleImageToTerraform}
                  disabled={!selectedImage || imageLoading}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
                >
                  <Play className="w-5 h-5" />
                  <span>{imageLoading ? 'Processing...' : 'Generate Terraform Code'}</span>
                </button>
              </div>
            </div>

            {imageOutput && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Generated Terraform Code</h3>
                  <button
                    onClick={() => copyToClipboard(imageOutput)}
                    className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </button>
                </div>
                <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{imageOutput}</code>
                </pre>
              </div>
            )}
          </div>
        );

      case 'resource-optimization':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">FinOps Optimizer</h2>
              <p className="text-gray-600 mb-6">Optimize your AWS costs and financial operations with advanced analytics and recommendations.</p>
              
              {!credentialsConnected ? (
                <div className="space-y-6">
                  {/* Warning Banner */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="text-sm font-medium text-yellow-800 mb-1">AWS Credentials Required</h3>
                        <p className="text-sm text-yellow-700">
                          To analyze your AWS costs and resources, we need access to your AWS account. Your credentials are encrypted and stored securely.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* AWS Credentials Form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        AWS Access Key ID *
                      </label>
                      <input
                        type="text"
                        value={awsAccessKey}
                        onChange={(e) => setAwsAccessKey(e.target.value)}
                        placeholder="AKIAIOSFODNN7EXAMPLE"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        AWS Secret Access Key *
                      </label>
                      <div className="relative">
                        <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="password"
                          value={awsSecretKey}
                          onChange={(e) => setAwsSecretKey(e.target.value)}
                          placeholder="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        AWS Region *
                      </label>
                      <select
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      >
                        <option value="">Select a region</option>
                        <option value="us-east-1">US East (N. Virginia)</option>
                        <option value="us-east-2">US East (Ohio)</option>
                        <option value="us-west-1">US West (N. California)</option>
                        <option value="us-west-2">US West (Oregon)</option>
                        <option value="eu-west-1">Europe (Ireland)</option>
                        <option value="eu-central-1">Europe (Frankfurt)</option>
                        <option value="ap-southeast-1">Asia Pacific (Singapore)</option>
                        <option value="ap-northeast-1">Asia Pacific (Tokyo)</option>
                        <option value="ap-south-1">Asia Pacific (India)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Session Token (Optional)
                      </label>
                      <textarea
                        value={awsSessionToken}
                        onChange={(e) => setAwsSessionToken(e.target.value)}
                        placeholder="For temporary credentials..."
                        className="w-full h-12 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                      />
                    </div>
                  </div>


                  {/* Save Credentials Option */}
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="saveCredentials"
                      checked={saveCredentials}
                      onChange={(e) => setSaveCredentials(e.target.checked)}
                      className="w-4 h-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                    />
                    <label htmlFor="saveCredentials" className="text-sm text-gray-700">
                      Save credentials securely for future sessions (encrypted locally)
                    </label>
                  </div>

                  {/* Security Notice */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-2">
                      <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm text-blue-800">
                        <p className="font-medium mb-1">Security & Privacy</p>
                        <p>Your AWS credentials are encrypted using AES-256 encryption and stored securely. We never store your credentials on our servers.</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-4">
                    <button
                      onClick={handleConnectCredentials}
                      disabled={!awsAccessKey.trim() || !awsSecretKey.trim() || !region || optimizationLoading}
                      className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
                    >
                      <Key className="w-5 h-5" />
                      <span>{optimizationLoading ? 'Connecting...' : 'Connect & Analyze'}</span>
                    </button>
                    
                    <button
                      onClick={handleTestConnection}
                      disabled={!awsAccessKey.trim() || !awsSecretKey.trim() || !region}
                      className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
                    >
                      <Shield className="w-5 h-5" />
                      <span>Test Connection</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <h3 className="text-sm font-medium text-green-800">Connected Successfully</h3>
                        <p className="text-sm text-green-700">AWS credentials verified for region: {region}</p>
                      </div>
                    </div>
                  </div>
                
                  <button
                    onClick={handleOptimizationAnalysis}
                    disabled={optimizationLoading}
                    className="bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
                  >
                    <TrendingUp className="w-5 h-5" />
                    <span>{optimizationLoading ? 'Analyzing...' : 'Start FinOps Analysis'}</span>
                  </button>
                </div>
              )}
            </div>

            {optimizationResults && (
              <div className="space-y-6">
                {/* Cost Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm">Current Monthly Cost</p>
                        <p className="text-2xl font-bold">$12,450</p>
                      </div>
                      <DollarSign className="w-8 h-8 text-blue-200" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100 text-sm">Potential Savings</p>
                        <p className="text-2xl font-bold">$3,280</p>
                      </div>
                      <TrendingDown className="w-8 h-8 text-green-200" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-100 text-sm">Optimization Score</p>
                        <p className="text-2xl font-bold">74%</p>
                      </div>
                      <Target className="w-8 h-8 text-orange-200" />
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 text-sm">ROI Potential</p>
                        <p className="text-2xl font-bold">26%</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-purple-200" />
                    </div>
                  </div>
                </div>

                {/* Cost Breakdown Pie Chart */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <PieChart className="w-5 h-5 mr-2 text-blue-600" />
                    Cost Distribution by Service
                  </h3>
                  <div className="flex items-center justify-center">
                    <div className="relative w-64 h-64">
                      {/* Pie Chart SVG */}
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        {/* EC2 - 45% */}
                        <circle
                          cx="50" cy="50" r="40"
                          fill="transparent"
                          stroke="#3B82F6"
                          strokeWidth="20"
                          strokeDasharray="113 251"
                          strokeDashoffset="0"
                          className="animate-pulse"
                          style={{ animationDelay: '0s', animationDuration: '2s' }}
                        />
                        {/* RDS - 25% */}
                        <circle
                          cx="50" cy="50" r="40"
                          fill="transparent"
                          stroke="#10B981"
                          strokeWidth="20"
                          strokeDasharray="63 251"
                          strokeDashoffset="-113"
                          className="animate-pulse"
                          style={{ animationDelay: '0.3s', animationDuration: '2s' }}
                        />
                        {/* S3 - 20% */}
                        <circle
                          cx="50" cy="50" r="40"
                          fill="transparent"
                          stroke="#F59E0B"
                          strokeWidth="20"
                          strokeDasharray="50 251"
                          strokeDashoffset="-176"
                          className="animate-pulse"
                          style={{ animationDelay: '0.6s', animationDuration: '2s' }}
                        />
                        {/* Others - 10% */}
                        <circle
                          cx="50" cy="50" r="40"
                          fill="transparent"
                          stroke="#8B5CF6"
                          strokeWidth="20"
                          strokeDasharray="25 251"
                          strokeDashoffset="-226"
                          className="animate-pulse"
                          style={{ animationDelay: '0.9s', animationDuration: '2s' }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-900">$12.4K</div>
                          <div className="text-sm text-gray-500">Total Cost</div>
                        </div>
                      </div>
                    </div>
                    <div className="ml-8 space-y-3">
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-blue-500 rounded mr-3"></div>
                        <span className="text-sm text-gray-700">EC2 Instances (45%) - $5,603</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-green-500 rounded mr-3"></div>
                        <span className="text-sm text-gray-700">RDS Databases (25%) - $3,113</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-yellow-500 rounded mr-3"></div>
                        <span className="text-sm text-gray-700">S3 Storage (20%) - $2,490</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-purple-500 rounded mr-3"></div>
                        <span className="text-sm text-gray-700">Other Services (10%) - $1,245</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Savings Opportunities Bar Chart */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-green-600" />
                    Top Savings Opportunities
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-32 text-sm text-gray-700">Right-size EC2</div>
                      <div className="flex-1 mx-4">
                        <div className="bg-gray-200 rounded-full h-6 relative overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-green-600 h-full rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                            style={{ width: '85%', animationDelay: '0s' }}
                          >
                            <span className="text-white text-xs font-semibold">$1,450</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-16 text-sm text-gray-500 text-right">85%</div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-32 text-sm text-gray-700">Reserved Instances</div>
                      <div className="flex-1 mx-4">
                        <div className="bg-gray-200 rounded-full h-6 relative overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                            style={{ width: '70%', animationDelay: '0.2s' }}
                          >
                            <span className="text-white text-xs font-semibold">$980</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-16 text-sm text-gray-500 text-right">70%</div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-32 text-sm text-gray-700">S3 Lifecycle</div>
                      <div className="flex-1 mx-4">
                        <div className="bg-gray-200 rounded-full h-6 relative overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-full rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                            style={{ width: '55%', animationDelay: '0.4s' }}
                          >
                            <span className="text-white text-xs font-semibold">$520</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-16 text-sm text-gray-500 text-right">55%</div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-32 text-sm text-gray-700">Unused Resources</div>
                      <div className="flex-1 mx-4">
                        <div className="bg-gray-200 rounded-full h-6 relative overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-red-500 to-red-600 h-full rounded-full transition-all duration-1000 ease-out flex items-center justify-end pr-2"
                            style={{ width: '40%', animationDelay: '0.6s' }}
                          >
                            <span className="text-white text-xs font-semibold">$330</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-16 text-sm text-gray-500 text-right">40%</div>
                    </div>
                  </div>
                </div>


                {/* Cost Optimization Recommendations */}

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">FinOps Analysis Results</h3>
                  <pre className="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm whitespace-pre-wrap">
                    {optimizationResults}
                  </pre>
                </div>
              </div>
            )}
          </div>
        );

      case 'aws-well-architect':
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">AWS Well-Architected Analyzer</h2>
              <p className="text-gray-600 mb-6">Navigate to the comprehensive AWS Well-Architected Framework analysis tool.</p>
              
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileText className="w-8 h-8 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">AWS Well-Architected Framework</h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  Access the detailed analysis tool for reviewing your architecture against AWS Well-Architected principles.
                </p>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 mx-auto">
                  <span>Go to Analyzer</span>
                  <ExternalLink className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-8">

            {/* Professional Image Gallery */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Infrastructure Showcase</h2>
                <div className="text-sm text-gray-500">Swipe to explore</div>
              </div>
              
              <div className="relative">
                <div className="flex overflow-x-auto scrollbar-hide space-x-6 pb-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  <div className="flex-shrink-0 group cursor-pointer">
                    <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      <img 
                        src="https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop" 
                        alt="Cloud Infrastructure" 
                        className="w-80 h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="font-semibold text-lg">Cloud Architecture</h3>
                        <p className="text-sm text-gray-200">Scalable infrastructure design</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0 group cursor-pointer">
                    <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      <img 
                        src="https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop" 
                        alt="Data Center" 
                        className="w-80 h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="font-semibold text-lg">Data Centers</h3>
                        <p className="text-sm text-gray-200">Enterprise-grade infrastructure</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0 group cursor-pointer">
                    <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      <img 
                        src="https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop" 
                        alt="Network Operations" 
                        className="w-80 h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="font-semibold text-lg">Network Operations</h3>
                        <p className="text-sm text-gray-200">24/7 monitoring & management</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0 group cursor-pointer">
                    <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      <img 
                        src="https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop" 
                        alt="DevOps Pipeline" 
                        className="w-80 h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="font-semibold text-lg">DevOps Pipeline</h3>
                        <p className="text-sm text-gray-200">Automated deployment workflows</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0 group cursor-pointer">
                    <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      <img 
                        src="https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop" 
                        alt="Security Infrastructure" 
                        className="w-80 h-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="font-semibold text-lg">Security Infrastructure</h3>
                        <p className="text-sm text-gray-200">Enterprise security solutions</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Quick Actions */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button 
                      onClick={() => setActivePage('terraform-generator')}
                      className="group p-6 border-2 border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 group-hover:bg-blue-200 rounded-lg flex items-center justify-center transition-colors">
                          <Code2 className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-semibold text-gray-900">Generate Template</h3>
                          <p className="text-sm text-gray-600 mt-1">Create new infrastructure code</p>
                        </div>
                      </div>
                    </button>

                    <button 
                      onClick={() => setActivePage('image-to-terraform')}
                      className="group p-6 border-2 border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-100 group-hover:bg-green-200 rounded-lg flex items-center justify-center transition-colors">
                          <Image className="w-6 h-6 text-green-600" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-semibold text-gray-900">Upload Diagram</h3>
                          <p className="text-sm text-gray-600 mt-1">Convert architecture to code</p>
                        </div>
                      </div>
                    </button>

                    <button 
                      onClick={() => setActivePage('resource-optimization')}
                      className="group p-6 border-2 border-gray-200 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition-all duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-orange-100 group-hover:bg-orange-200 rounded-lg flex items-center justify-center transition-colors">
                          <DollarSign className="w-6 h-6 text-orange-600" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-semibold text-gray-900">FinOps Optimizer</h3>
                          <p className="text-sm text-gray-600 mt-1">Optimize costs & financial operations</p>
                        </div>
                      </div>
                    </button>

                    <button 
                      onClick={() => setActivePage('check-compliance')}
                      className="group p-6 border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 transition-all duration-200"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-purple-100 group-hover:bg-purple-200 rounded-lg flex items-center justify-center transition-colors">
                          <Shield className="w-6 h-6 text-purple-600" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-semibold text-gray-900">Security Scan</h3>
                          <p className="text-sm text-gray-600 mt-1">Check compliance status</p>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Code2 className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">EC2 template generated</p>
                      <p className="text-xs text-gray-500 mt-1">Production environment setup</p>
                      <div className="flex items-center mt-2">
                        <Clock className="w-3 h-3 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500">2 hours ago</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">Compliance check passed</p>
                      <p className="text-xs text-gray-500 mt-1">All security policies validated</p>
                      <div className="flex items-center mt-2">
                        <Clock className="w-3 h-3 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500">4 hours ago</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-4 h-4 text-orange-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">Cost optimization alert</p>
                      <p className="text-xs text-gray-500 mt-1">Potential savings identified</p>
                      <div className="flex items-center mt-2">
                        <Clock className="w-3 h-3 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500">6 hours ago</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Image className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">Architecture diagram processed</p>
                      <p className="text-xs text-gray-500 mt-1">Terraform code generated successfully</p>
                      <div className="flex items-center mt-2">
                        <Clock className="w-3 h-3 text-gray-400 mr-1" />
                        <span className="text-xs text-gray-500">1 day ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Code2 className="w-8 h-8 text-slate-700" />
            <span className="text-xl font-bold text-gray-900">BCT Terraform Tools</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
              Main Tools
            </h3>
            <div className="space-y-1">
              <button 
                onClick={() => setActivePage('dashboard')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors text-left ${
                  activePage === 'dashboard' 
                    ? 'text-slate-700 bg-slate-50 border-l-4 border-slate-600' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Home className="w-5 h-5" />
                <span className={activePage === 'dashboard' ? 'font-medium' : ''}>Dashboard</span>
              </button>
              
              <button 
                onClick={() => setActivePage('terraform-generator')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors text-left ${
                  activePage === 'terraform-generator' 
                    ? 'text-blue-700 bg-blue-50 border-l-4 border-blue-600' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Code2 className="w-5 h-5" />
                <span className={activePage === 'terraform-generator' ? 'font-medium' : ''}>Terraform Generator</span>
              </button>
              
              <button 
                onClick={() => setActivePage('check-compliance')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors text-left ${
                  activePage === 'check-compliance' 
                    ? 'text-purple-700 bg-purple-50 border-l-4 border-purple-600' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Shield className="w-5 h-5" />
                <span className={activePage === 'check-compliance' ? 'font-medium' : ''}>Check Compliance</span>
              </button>
              
              <button 
                onClick={() => setActivePage('image-to-terraform')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors text-left ${
                  activePage === 'image-to-terraform' 
                    ? 'text-green-700 bg-green-50 border-l-4 border-green-600' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Image className="w-5 h-5" />
                <span className={activePage === 'image-to-terraform' ? 'font-medium' : ''}>Image to Terraform</span>
              </button>
              
              <button 
                onClick={() => setActivePage('resource-optimization')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors text-left ${
                  activePage === 'resource-optimization' 
                    ? 'text-orange-700 bg-orange-50 border-l-4 border-orange-600' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <DollarSign className="w-5 h-5" />
                <span className={activePage === 'resource-optimization' ? 'font-medium' : ''}>FinOps Optimizer</span>
              </button>
              
              <button 
                onClick={() => setActivePage('aws-well-architect')}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors text-left ${
                  activePage === 'aws-well-architect' 
                    ? 'text-indigo-700 bg-indigo-50 border-l-4 border-indigo-600' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <FileText className="w-5 h-5" />
                <span className={activePage === 'aws-well-architect' ? 'font-medium' : ''}>AWS Well Architect Analyzer</span>
              </button>
            </div>
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Venkat</p>
              <p className="text-xs text-gray-500">venkat@bahwancybertek.com</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors text-sm"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {activePage === 'dashboard' && 'Infrastructure Dashboard'}
                {activePage === 'terraform-generator' && 'Terraform Code Generator'}
                {activePage === 'check-compliance' && 'Compliance Checker'}
                {activePage === 'image-to-terraform' && 'Image to Terraform'}
                {activePage === 'resource-optimization' && 'FinOps Optimizer'}
                {activePage === 'aws-well-architect' && 'AWS Well-Architected Analyzer'}
              </h1>
              <p className="text-gray-600 mt-1">
                {activePage === 'dashboard' && 'Monitor and manage your cloud infrastructure'}
                {activePage === 'terraform-generator' && 'Generate production-ready Terraform code from descriptions'}
                {activePage === 'check-compliance' && 'Validate your infrastructure against compliance standards'}
                {activePage === 'image-to-terraform' && 'Convert architecture diagrams to Terraform code'}
                {activePage === 'resource-optimization' && 'Optimize your AWS costs and financial operations'}
                {activePage === 'aws-well-architect' && 'Analyze your architecture against AWS best practices'}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-lg font-semibold text-gray-900">Welcome Venkat</div>
                <div className="text-sm text-gray-500">Last login 2 hrs ago</div>
              </div>
              
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center text-white font-medium">
                    V
                  </div>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <div className="font-medium text-gray-900">Venkat</div>
                      <div className="text-sm text-gray-500">venkat@bahwancybertek</div>
                    </div>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Settings
                    </button>
                    <button 
                      onClick={onLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;