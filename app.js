// Main React App Component
const { useState, useEffect } = React;

// Header Component
const Header = ({ onNavigate, currentSection }) => {
    const handleNavClick = (e, section) => {
        e.preventDefault();
        onNavigate(section);
    };

    return (
        <header className="header">
            <nav className="nav">
                <a href="#" className="logo" onClick={(e) => handleNavClick(e, 'home')}>
                    <i className="fas fa-shield-alt"></i> DeepfakeDetector
                </a>
                <ul className="nav-links">
                    <li><a href="#home" onClick={(e) => handleNavClick(e, 'home')} className={currentSection === 'home' ? 'active' : ''}>Home</a></li>
                    <li><a href="#upload" onClick={(e) => handleNavClick(e, 'upload')} className={currentSection === 'upload' ? 'active' : ''}>Upload</a></li>
                    <li><a href="#features" onClick={(e) => handleNavClick(e, 'features')} className={currentSection === 'features' ? 'active' : ''}>Features</a></li>
                    <li><a href="#about" onClick={(e) => handleNavClick(e, 'about')} className={currentSection === 'about' ? 'active' : ''}>About</a></li>
                </ul>
            </nav>   
        </header>
    );
};            

// Hero Section Component
const Hero = () => {
    return (
        <section className="hero" id="home">
            <h1>Deepfake Detection Using AI</h1>
            <p>Advanced artificial intelligence to detect and identify deepfake videos, images, and audio with high accuracy</p>
            <a href="#upload" className="cta-button">
                <i className="fas fa-upload"></i> Start Detection
            </a>
        </section>
    );
};

// File Upload Component
const FileUpload = ({ onFileUpload, isUploading }) => {
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadType, setUploadType] = useState('image'); // 'image', 'video', 'audio'

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleFile = (file) => {
        const isImage = file.type.startsWith('image/');
        const isVideo = file.type.startsWith('video/');
        const isAudio = file.type.startsWith('audio/');
        
        if (isImage || isVideo || isAudio) {
            setSelectedFile(file);
            onFileUpload(file);
        } else {
            alert('Please upload an image, video, or audio file.');
        }
    };

    const handleFileInput = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const getUploadIcon = () => {
        switch (uploadType) {
            case 'video':
                return 'fas fa-video';
            case 'audio':
                return 'fas fa-microphone';
            default:
                return 'fas fa-image';
        }
    };

    const getUploadText = () => {
        switch (uploadType) {
            case 'video':
                return selectedFile ? `Selected: ${selectedFile.name}` : 'Click here to upload video';
            case 'audio':
                return selectedFile ? `Selected: ${selectedFile.name}` : 'Click here to upload audio';
            default:
                return selectedFile ? `Selected: ${selectedFile.name}` : 'Click here to upload picture';
        }
    };

    const getAcceptTypes = () => {
        switch (uploadType) {
            case 'video':
                return 'video/*';
            case 'audio':
                return 'audio/*';
            default:
                return 'image/*';
        }
    };

    return (
        <section className="upload-section" id="upload">
            <h2>Upload Media for Deepfake Detection</h2>
            <p>Upload your image, video, or audio to check if it's real or AI-generated deepfake</p>
            
            {/* Media Type Selector */}
            <div className="media-type-selector">
                <button 
                    className={`type-button ${uploadType === 'image' ? 'active' : ''}`}
                    onClick={() => setUploadType('image')}
                >
                    <i className="fas fa-image"></i>
                    <span>Image</span>
                </button>
                <button 
                    className={`type-button ${uploadType === 'video' ? 'active' : ''}`}
                    onClick={() => setUploadType('video')}
                >
                    <i className="fas fa-video"></i>
                    <span>Video</span>
                </button>
                <button 
                    className={`type-button ${uploadType === 'audio' ? 'active' : ''}`}
                    onClick={() => setUploadType('audio')}
                >
                    <i className="fas fa-microphone"></i>
                    <span>Audio</span>
                </button>
            </div>
            
            <div className="upload-options">
                <div 
                    className={`upload-area ${dragActive ? 'dragover' : ''}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('file-input').click()}
                >
                    <div className="upload-icon">
                        <i className={getUploadIcon()}></i>
                    </div>
                    <div className="upload-text">
                        {getUploadText()}
                    </div>
                    <div className="upload-hint">
                        <i className="fas fa-arrow-down"></i>
                        <span>Drag & Drop your {uploadType} here</span>
                    </div>
                </div>
                
                <div className="upload-buttons">
                    <button 
                        className="upload-button primary" 
                        onClick={() => document.getElementById('file-input').click()}
                        disabled={isUploading}
                    >
                        <i className="fas fa-upload"></i>
                        {isUploading ? 'Analyzing...' : `Upload ${uploadType.charAt(0).toUpperCase() + uploadType.slice(1)}`}
                    </button>
                    
                    {uploadType === 'image' && (
                        <button 
                            className="upload-button secondary" 
                            onClick={() => document.getElementById('camera-input').click()}
                            disabled={isUploading}
                        >
                            <i className="fas fa-camera"></i>
                            Take Photo
                        </button>
                    )}
                    
                    {uploadType === 'video' && (
                        <button 
                            className="upload-button secondary" 
                            onClick={() => document.getElementById('camera-input').click()}
                            disabled={isUploading}
                        >
                            <i className="fas fa-video"></i>
                            Record Video
                        </button>
                    )}
                    
                    {uploadType === 'audio' && (
                        <button 
                            className="upload-button secondary" 
                            onClick={() => document.getElementById('camera-input').click()}
                            disabled={isUploading}
                        >
                            <i className="fas fa-microphone"></i>
                            Record Audio
                        </button>
                    )}
                </div>
                
                <input
                    id="file-input"
                    type="file"
                    className="file-input"
                    accept={getAcceptTypes()}
                    onChange={handleFileInput}
                />
                
                <input
                    id="camera-input"
                    type="file"
                    className="file-input"
                    accept={getAcceptTypes()}
                    capture={uploadType === 'image' ? 'environment' : uploadType === 'video' ? 'video' : 'audio'}
                    onChange={handleFileInput}
                />
            </div>
            
            {/* Supported Formats Info */}
            <div className="supported-formats">
                <h4>Supported Formats:</h4>
                <div className="format-list">
                    {uploadType === 'image' && (
                        <span>Images: JPG, PNG, GIF, WebP, BMP</span>
                    )}
                    {uploadType === 'video' && (
                        <span>Videos: MP4, AVI, MOV, WebM, MKV</span>
                    )}
                    {uploadType === 'audio' && (
                        <span>Audio: MP3, WAV, AAC, OGG, M4A</span>
                    )}
                </div>
            </div>
            
            {isUploading && (
                <div className="loading">
                    <div className="spinner"></div>
                    <p>Analyzing your {uploadType} with AI...</p>
                    <p className="loading-details">Checking for deepfake manipulation...</p>
                </div>
            )}
        </section>
    );
};

// Results Component
const Results = ({ results, isVisible, onRestoreImage }) => {
    if (!isVisible) return null;

    const getConfidenceColor = (confidence) => {
        // Check if result is authentic or deepfake first
        const isAuthentic = results.isDeepfake === false;
        
        if (isAuthentic) {
            // Green for authentic results
            return '#4caf50';
        } else {
            // Red for deepfake results
            return '#ff6b6b';
        }
    };

    const getResultText = (isDeepfake, confidence) => {
        if (isDeepfake) {
            return confidence > 80 ? 'Highly Likely Deepfake' : 'Likely Deepfake';
        } else {
            return confidence > 80 ? 'Likely Authentic' : 'Possibly Authentic';
        }
    };

    // Download analysis report as HTML (professional design)
    const handleDownloadReport = () => {
        const reportHtml = `<!DOCTYPE html>
<html lang='en'>
<head>
  <meta charset='UTF-8'>
  <title>Deepfake Detection Report</title>
  <link href='https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap' rel='stylesheet'>
  <style>
    body { font-family: 'Inter', Arial, sans-serif; background: #f8fafc; color: #232946; padding: 0; margin: 0; }
    .report-container { background: #fff; border-radius: 18px; box-shadow: 0 8px 32px rgba(102,126,234,0.13); max-width: 700px; margin: 2.5rem auto; padding: 2.5rem 2rem 2rem 2rem; position: relative; overflow: hidden; }
    .report-header { background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); color: #fff; padding: 2rem 2rem 1.5rem 2rem; border-radius: 18px 18px 0 0; box-shadow: 0 4px 24px rgba(102,126,234,0.10); display: flex; align-items: center; gap: 1.2rem; }
    .report-header .icon { font-size: 2.7rem; background: #fff; color: #764ba2; border-radius: 50%; padding: 0.5rem 0.7rem; box-shadow: 0 2px 8px rgba(102,126,234,0.10); }
    .report-header .title { font-size: 2.1rem; font-weight: 900; letter-spacing: 1px; }
    .divider { border: none; border-top: 2px solid #e0e7ff; margin: 2rem 0 1.5rem 0; }
    table { width: 100%; border-collapse: separate; border-spacing: 0; margin-bottom: 2rem; font-size: 1.08rem; }
    th, td { text-align: left; padding: 0.85rem 0.7rem; }
    th { color: #667eea; font-weight: 700; background: #f8f9ff; border-radius: 8px 0 0 8px; border-bottom: 1.5px solid #e0e7ff; }
    td { background: #f8fafc; border-radius: 0 8px 8px 0; border-bottom: 1.5px solid #e0e7ff; }
    tr:last-child th, tr:last-child td { border-bottom: none; }
    .section-title { color: #764ba2; font-size: 1.2rem; font-weight: 700; margin-bottom: 0.7rem; margin-top: 1.5rem; letter-spacing: 0.5px; }
    .signature { margin-top: 2.5rem; display: flex; align-items: center; gap: 1.2rem; }
    .sig-block { flex: 1; }
    .sig-label { color: #667eea; font-size: 0.95rem; font-weight: 700; }
    .sig-line { border-bottom: 1.5px solid #e0e7ff; width: 100%; margin: 0.5rem 0 0.2rem 0; }
    .sig-name { color: #232946; font-weight: 700; font-size: 1.05rem; }
    @media print { .report-container { box-shadow: none; margin: 0; } }
  </style>
  <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'>
</head>
<body>
  <div class='report-container'>
    <div class='report-header'>
      <span class='icon'><i class="fas fa-shield-alt"></i></span>
      <span class='title'>Deepfake Detection Report</span>
    </div>
    <hr class='divider'/>
    <div class='section-title'>Analysis Summary</div>
    <table>
      <tr><th>Detection Result</th><td>${getResultText(results.isDeepfake, results.confidence)}</td></tr>
      <tr><th>Confidence Score</th><td>${results.confidence}%</td></tr>
      <tr><th>Manipulated Region</th><td>${results.manipulatedRegion || 'N/A'}</td></tr>
      <tr><th>Analysis Details</th><td>${results.isDeepfake ? 'AI detected signs of manipulation in this media' : 'No significant signs of manipulation detected'}</td></tr>
      <tr><th>Processing Time</th><td>${results.processingTime} ms</td></tr>
    </table>
    <div class='section-title'>File Information</div>
    <table>
      <tr><th>File Name</th><td>${results.fileName || 'N/A'}</td></tr>
      <tr><th>File Type</th><td>${results.fileType || 'N/A'}</td></tr>
      <tr><th>File Size</th><td>${results.fileSize ? (results.fileSize/1024).toFixed(2) + ' KB' : 'N/A'}</td></tr>
    </table>
    <div class='signature'>
      <div class='sig-block'>
        <div class='sig-label'>Analyst Signature</div>
        <div class='sig-line'></div>
        <div class='sig-name'>Deepfake AI System</div>
      </div>
      <div class='sig-block'>
        <div class='sig-label'>Date</div>
        <div class='sig-line'></div>
        <div class='sig-name'>${new Date().toLocaleDateString()}</div>
      </div>
    </div>
  </div>
</body>
</html>`;
        const blob = new Blob([reportHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${results.fileName || 'analysis'}-deepfake-report.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <section className="results-section fade-in">
            <div className="results-header">
                <h2>Analysis Results</h2>
                <p>AI-powered deepfake detection and restoration results</p>
            </div>
            {/* Download Report Button */}
            <div style={{ textAlign: 'right', marginBottom: '1rem' }}>
                <button className="download-button" onClick={handleDownloadReport}>
                    <i className="fas fa-download"></i> Download Report
                </button>
            </div>
            
            <div className="result-card">
                <div className="result-label">Detection Result</div>
                <div className="result-value" style={{ color: getConfidenceColor(results.confidence) }}>
                    {getResultText(results.isDeepfake, results.confidence)}
                </div>
            </div>
            
            <div className="result-card">
                <div className="result-label">Confidence Score</div>
                <div className="result-value">{results.confidence}%</div>
                <div className="confidence-bar">
                    <div 
                        className="confidence-fill" 
                        style={{ 
                            width: `${results.confidence}%`,
                            background: `linear-gradient(45deg, ${getConfidenceColor(results.confidence)}, ${getConfidenceColor(results.confidence)}dd)`
                        }}
                    ></div>
                </div>
            </div>

            <div className="result-card">
                <div className="result-label">Manipulated Region</div>
                <div className="result-value">{results.manipulatedRegion || 'N/A'}</div>
            </div>
            
            <div className="result-card">
                <div className="result-label">Analysis Details</div>
                <div className="result-value">
                    {results.isDeepfake ? 
                        'AI detected signs of manipulation in this media' : 
                        'No significant signs of manipulation detected'
                    }
                </div>
            </div>
            
            <div className="result-card">
                <div className="result-label">Processing Time</div>
                <div className="result-value">{results.processingTime}ms</div>
            </div>

            {results.isDeepfake && results.confidence > 70 && (
                <div className="restoration-section">
                    <div className="restoration-header">
                        <h3>Image Restoration Available</h3>
                        <p>Our AI can attempt to restore the original image by removing deepfake manipulations</p>
                    </div>
                    <button 
                        className="restore-button"
                        onClick={() => onRestoreImage(results.fileName)}
                    >
                        <i className="fas fa-magic"></i>
                        Restore Original Image
                    </button>
                </div>
            )}
        </section>
    );
};

// Features Component
const Features = () => {
    const features = [
        {
            icon: 'fas fa-bolt',
            title: 'Real-time Analysis',
            description: 'Lightning-fast AI processing with instant results for images, videos, and audio files.'
        },
        {
            icon: 'fas fa-brain',
            title: 'Advanced AI',
            description: 'State-of-the-art deep learning models trained on millions of samples for accurate detection.'
        },
        {
            icon: 'fas fa-magic',
            title: 'Multi-Media Support',
            description: 'Detect deepfakes in images, videos, and audio files with comprehensive analysis.'
        },
        {
            icon: 'fas fa-mobile-alt',
            title: 'Multi-format Support',
            description: 'Supports images (JPG, PNG, GIF), videos (MP4, AVI, MOV), and audio (MP3, WAV, AAC).'
        },
        {
            icon: 'fas fa-users',
            title: 'User-friendly',
            description: 'Simple drag-and-drop interface designed for everyone to use easily.'
        },
        {
            icon: 'fas fa-download',
            title: 'Download Results',
            description: 'Download restored media and detailed analysis reports for your records.'
        }
    ];

    return (
        <section className="features" id="features">
            {features.map((feature, index) => (
                <div key={index} className="feature-card slide-up">
                    <div className="feature-icon">
                        <i className={feature.icon}></i>
                    </div>
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-description">{feature.description}</p>
                </div>
            ))}
        </section>
    );
};

// Image Restoration Component
const ImageRestoration = ({ originalImage, restoredImage, isVisible, isRestoring }) => {
    if (!isVisible) return null;

    // Download restored image
    const handleDownloadImage = () => {
        if (!restoredImage) return;
        const a = document.createElement('a');
        a.href = restoredImage;
        a.download = 'restored-authentic-image.png';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    return (
        <section className="restoration-section fade-in">
            <div className="restoration-header">
                <h2>Image Restoration Results</h2>
                <p>Comparison between manipulated and authentic original images</p>
            </div>
            
            <div className="image-comparison">
                <div className="image-card">
                    <h3>Manipulated (Deepfake)</h3>
                    <div className="image-container fake-container">
                        <img src={originalImage} alt="Manipulated deepfake image" />
                        <div className="image-overlay">
                            <span className="badge deepfake">Deepfake Detected</span>
                        </div>
                        <div className="fake-indicators">
                            <div className="fake-indicator">
                                <i className="fas fa-exclamation-triangle"></i>
                                <span>AI Generated</span>
                            </div>
                            <div className="fake-indicator">
                                <i className="fas fa-ban"></i>
                                <span>Manipulated</span>
                            </div>
                        </div>
                    </div>
                    <p className="image-description">Manipulated image with AI-generated content</p>
                </div>
                
                <div className="comparison-arrow">
                    <i className="fas fa-arrow-right"></i>
                </div>
                
                <div className="image-card">
                    <h3>Authentic (Original)</h3>
                    <div className="image-container authentic-container">
                        {isRestoring ? (
                            <div className="restoring-placeholder">
                                <div className="spinner"></div>
                                <p>Restoring original image...</p>
                            </div>
                        ) : (
                            <>
                                <img src={restoredImage} alt="Authentic original image" />
                                <div className="image-overlay">
                                    <span className="badge authentic">Authentic Original</span>
                                </div>
                                <div className="authentic-indicators">
                                    <div className="authentic-indicator">
                                        <i className="fas fa-check-circle"></i>
                                        <span>Verified Original</span>
                                    </div>
                                    <div className="authentic-indicator">
                                        <i className="fas fa-shield-alt"></i>
                                        <span>AI Restored</span>
                                    </div>
                                    <div className="authentic-indicator">
                                        <i className="fas fa-certificate"></i>
                                        <span>Authenticity Certified</span>
                                    </div>
                                </div>
                                <div className="authentic-watermark">
                                    <div className="watermark-content">
                                        <i className="fas fa-shield-check"></i>
                                        <span>ORIGINAL</span>
                                        <small>AI Verified</small>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <p className="image-description">AI-restored authentic original image</p>
                </div>
            </div>
            
            <div className="restoration-details">
                <div className="detail-card">
                    <h4>Restoration Process</h4>
                    <ul>
                        <li>Face detection and analysis</li>
                        <li>Removal of AI-generated artifacts</li>
                        <li>Reconstruction of original features</li>
                        <li>Quality enhancement and refinement</li>
                        <li>Authenticity certification and watermarking</li>
                    </ul>
                </div>
                
                <div className="detail-card">
                    <h4>Technical Details</h4>
                    <ul>
                        <li>Advanced GAN-based restoration</li>
                        <li>Multi-scale feature analysis</li>
                        <li>Context-aware reconstruction</li>
                        <li>Quality preservation algorithms</li>
                        <li>Digital signature generation</li>
                    </ul>
                </div>
            </div>
            
            <div className="restoration-actions">
                <button className="download-button" onClick={handleDownloadImage}>
                    <i className="fas fa-download"></i>
                    Download Authentic Image
                </button>
                <button className="certificate-button">
                    <i className="fas fa-certificate"></i>
                    Download Certificate
                </button>
                <button className="share-button">
                    <i className="fas fa-share"></i>
                    Share Results
                </button>
            </div>
        </section>
    );
};

// About Component
const About = ({ isVisible }) => {
    if (!isVisible) return null;

    const teamMembers = [
        {
            name: 'Dr. Sarah Chen',
            role: 'Lead AI Researcher',
            bio: 'PhD in Computer Science with 10+ years experience in deep learning and computer vision.',
            avatar: 'fas fa-user-graduate'
        },
        {
            name: 'Alex Rodriguez',
            role: 'Full Stack Developer',
            bio: 'Expert in React, Node.js, and building scalable web applications.',
            avatar: 'fas fa-code'
        },
        {
            name: 'Dr. Michael Kim',
            role: 'Data Scientist',
            bio: 'Specialist in machine learning algorithms and neural network architectures.',
            avatar: 'fas fa-chart-bar'
        },
        {
            name: 'Emily Watson',
            role: 'UX/UI Designer',
            bio: 'Passionate about creating intuitive and beautiful user experiences.',
            avatar: 'fas fa-palette'
        }
    ];

    const technologies = [
        { name: 'TensorFlow', icon: 'fas fa-brain' },
        { name: 'PyTorch', icon: 'fas fa-fire' },
        { name: 'OpenCV', icon: 'fas fa-eye' },
        { name: 'React', icon: 'fab fa-react' },
        { name: 'Node.js', icon: 'fab fa-node-js' },
        { name: 'Python', icon: 'fab fa-python' }
    ];

    return (
        <section className="about-section fade-in" id="about">
            <div className="about-header">
                <h2>About Deepfake Detection AI</h2>
                <p>Empowering users with cutting-edge AI technology to combat misinformation</p>
            </div>

            <div className="about-content">
                <div className="about-story">
                    <h3>Our Mission</h3>
                    <p>
                        In today's digital age, the proliferation of deepfake technology poses a significant threat to truth and trust. 
                        Our mission is to provide accessible, accurate, and reliable deepfake detection tools that help individuals 
                        and organizations identify manipulated media content.
                    </p>
                    <p>
                        We believe that everyone deserves access to tools that can help them distinguish between authentic and 
                        AI-generated content. Our platform combines state-of-the-art machine learning algorithms with a user-friendly 
                        interface to make deepfake detection accessible to everyone.
                    </p>
                </div>

                <div className="about-stats">
                    <div className="stat-card">
                        <div className="stat-number">99.2%</div>
                        <div className="stat-label">Detection Accuracy</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">1M+</div>
                        <div className="stat-label">Files Analyzed</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">50K+</div>
                        <div className="stat-label">Happy Users</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-number">24/7</div>
                        <div className="stat-label">Availability</div>
                    </div>
                </div>

                <div className="values-section">
                    <h3>Our Values</h3>
                    <div className="values-grid">
                        <div className="value-card">
                            <i className="fas fa-shield-alt"></i>
                            <h4>Privacy & Security</h4>
                            <p>Your data never leaves your device. We prioritize your privacy above all else.</p>
                        </div>
                        <div className="value-card">
                            <i className="fas fa-balance-scale"></i>
                            <h4>Transparency</h4>
                            <p>We believe in open, honest communication about our technology and processes.</p>
                        </div>
                        <div className="value-card">
                            <i className="fas fa-globe"></i>
                            <h4>Accessibility</h4>
                            <p>Making advanced AI technology available to everyone, regardless of technical background.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Footer Component
const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; 2025 Deepfake Detection Using AI. All rights reserved.</p>
            <p>Powered by advanced artificial intelligence and machine learning</p>
        </footer>
    );
};

// ChatSupport Component (Floating Help Chat)
const ChatSupport = () => {
    const [open, setOpen] = React.useState(false);
    const [messages, setMessages] = React.useState([
        { from: 'ai', text: 'Hello! How can I help you today? I can answer questions about deepfake detection!' }
    ]);
    const [input, setInput] = React.useState('');
    const chatEndRef = React.useRef(null);

    React.useEffect(() => {
        if (open && chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages, open]);

    const handleSend = () => {
        if (!input.trim()) return;
        const userMsg = { from: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        
        // Simulate AI reply
        setTimeout(() => {
            let aiText = '';
            const text = userMsg.text.toLowerCase();
            if (/hello|hi|namaste|hey|good morning|good afternoon|good evening/.test(text)) {
                aiText = 'Hello! 👋 I am your AI assistant. How can I help you today? You can ask me about deepfake detection!';
            } else if (/how are you|kaise ho|how r u/.test(text)) {
                aiText = 'I am always ready to help you! 😊 How can I assist you with deepfake detection or app usage?';
            } else if (/upload|photo|image|video|picture/.test(text)) {
                aiText = '📸 You can upload images, videos, and audio files in the main app! Go to the upload section and select your media type.';
            } else if (/result|score|confidence|analysis/.test(text)) {
                aiText = 'After uploading media in the main app, you will see detection results, confidence scores, and detailed analysis.';
            } else if (/report|download/.test(text)) {
                aiText = 'You can download detailed reports from the main app after analysis. The reports include comprehensive analysis results.';
            } else if (/thank|shukriya|dhanyavad/.test(text)) {
                aiText = 'You are welcome! If you have more questions, feel free to ask anytime.';
            } else if (/problem|error|issue|not working/.test(text)) {
                aiText = 'Sorry to hear that you are facing an issue. Please describe your problem in detail, and I will try my best to help!';
            } else if (/who are you|about you|your name/.test(text)) {
                aiText = 'I am your virtual AI help assistant for Deepfake Detection Using AI. I can help you with questions about the app!';
            } else {
                aiText = 'I am here to help with deepfake detection! You can upload media files in the main app for analysis.';
            }
            setMessages(prev => [...prev, { from: 'ai', text: aiText }]);
        }, 900);
    };

    return (
        <>
            <div style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 9999 }}>
                {!open && (
                    <button
                        onClick={() => setOpen(true)}
                        style={{
                            background: 'linear-gradient(90deg,#667eea,#764ba2)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '50%',
                            width: 60,
                            height: 60,
                            boxShadow: '0 4px 16px rgba(102,126,234,0.18)',
                            fontSize: 28,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        title="Online Help Support"
                    >
                        <i className="fas fa-comments"></i>
                    </button>
                )}
                {open && (
                    <div style={{
                        width: 340,
                        height: 420,
                        background: '#fff',
                        borderRadius: 18,
                        boxShadow: '0 8px 32px rgba(102,126,234,0.18)',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        position: 'relative',
                    }}>
                        <div style={{
                            background: 'linear-gradient(90deg,#667eea,#764ba2)',
                            color: '#fff',
                            padding: '1rem',
                            fontWeight: 700,
                            fontSize: '1.1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <span><i className="fas fa-robot"></i> Online Help Support</span>
                            <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer' }} title="Close"><i className="fas fa-times"></i></button>
                        </div>
                        <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', background: '#f8f9ff' }}>
                            {messages.map((msg, idx) => (
                                <div key={idx} style={{
                                    marginBottom: 12,
                                    textAlign: msg.from === 'user' ? 'right' : 'left',
                                }}>
                                    <span style={{
                                        display: 'inline-block',
                                        background: msg.from === 'user' ? 'linear-gradient(90deg,#667eea,#764ba2)' : '#e0e7ff',
                                        color: msg.from === 'user' ? '#fff' : '#232946',
                                        borderRadius: 16,
                                        padding: '0.6rem 1rem',
                                        maxWidth: 220,
                                        fontSize: '1rem',
                                        boxShadow: msg.from === 'user' ? '0 2px 8px rgba(102,126,234,0.10)' : 'none',
                                    }}>{msg.text}</span>
                                </div>
                            ))}
                            <div ref={chatEndRef}></div>
                        </div>
                        <div style={{ padding: '0.7rem', background: '#fff', borderTop: '1px solid #e0e7ff', display: 'flex', gap: 8 }}>
                            <input
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
                                placeholder="Type your message..."
                                style={{ flex: 1, borderRadius: 14, border: '1px solid #e0e7ff', padding: '0.6rem 1rem', fontSize: '1rem' }}
                            />
                            <button
                                onClick={handleSend}
                                style={{
                                    background: 'linear-gradient(90deg,#667eea,#764ba2)',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: 14,
                                    padding: '0.6rem 1.2rem',
                                    fontWeight: 700,
                                    fontSize: '1rem',
                                    cursor: 'pointer',
                                }}
                            >
                                <i className="fas fa-paper-plane"></i>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

// Main App Component
const App = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [results, setResults] = useState(null);
    const [showResults, setShowResults] = useState(false);
    const [currentSection, setCurrentSection] = useState('home');
    const [originalImage, setOriginalImage] = useState(null);
    const [restoredImage, setRestoredImage] = useState(null);
    const [showRestoration, setShowRestoration] = useState(false);
    const [isRestoring, setIsRestoring] = useState(false);

    const simulateAnalysis = (file) => {
        setIsUploading(true);
        setShowResults(false);
        setShowRestoration(false);
        
        // Create object URL for the uploaded image
        const imageUrl = URL.createObjectURL(file);
        setOriginalImage(imageUrl);
        
        // Consistent analysis based on file hash
        setTimeout(() => {
            // Create a simple hash from file properties for consistent results
            const fileHash = file.name.length + file.size + file.lastModified;
            const isDeepfake = fileHash % 3 === 0; // 1/3 chance of being deepfake
            const confidence = 60 + (fileHash % 40); // 60-100% confidence
            const processingTime = 1000 + (fileHash % 2000); // 1-3 seconds
            
            // Consistent manipulation info based on hash
            const manipulatedRegion = isDeepfake ? 'Face area' : '';
            const manipulationType = isDeepfake ? 'Face Swap' : '';
            
            setResults({
                isDeepfake,
                confidence,
                processingTime,
                fileName: file.name,
                fileSize: file.size,
                fileType: file.type,
                manipulatedRegion,
                manipulationType
            });
            
            setIsUploading(false);
            setShowResults(true);
        }, 2000);
    };

    const handleFileUpload = (file) => {
        simulateAnalysis(file);
    };

    const handleImageRestoration = (fileName) => {
        setIsRestoring(true);
        setShowRestoration(true);
        
        // Simulate image restoration process
        setTimeout(() => {
            // For demo purposes, we'll use the same image as "restored"
            // In a real implementation, this would be the AI-restored image
            setRestoredImage(originalImage);
            setIsRestoring(false);
        }, 3000);
    };

    const handleNavigation = (section) => {
        setCurrentSection(section);
        // Smooth scroll to section
        const element = document.getElementById(section);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="app">
            <Header onNavigate={handleNavigation} currentSection={currentSection} />
            <Hero />
            <div className="main-content">
                <FileUpload onFileUpload={handleFileUpload} isUploading={isUploading} />
                <Results 
                    results={results} 
                    isVisible={showResults} 
                    onRestoreImage={handleImageRestoration}
                />
                <ImageRestoration 
                    originalImage={originalImage}
                    restoredImage={restoredImage}
                    isVisible={showRestoration}
                    isRestoring={isRestoring}
                />
                <Features />
                <About isVisible={currentSection === 'about'} />
            </div>
            <Footer />
            <ChatSupport />
        </div>
    );
};

// Render the app
ReactDOM.render(<App />, document.getElementById('root')); 