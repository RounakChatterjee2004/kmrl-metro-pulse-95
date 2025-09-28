import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'ml';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    dashboard: 'Dashboard',
    documents: 'Documents',
    upload: 'Upload',
    search: 'Search',
    alerts: 'Alerts',
    auditLogs: 'Audit Logs',
    analytics: 'Analytics',
    settings: 'Settings',
    engineering: 'Engineering',
    finance: 'Finance',
    hr: 'Human Resources',
    safety: 'Safety',
    legal: 'Legal',
    operations: 'Operations',
    connectors: 'System Connectors',
    departments: 'Departments',
    
    // Header translations
    notifications: 'Notifications',
    allNotifications: 'All Notifications',
    markAllAsRead: 'Mark all as read',
    
    // Dashboard metrics
    thisMonth: 'this month',
    previousMonth: 'vs previous month',
    noChangeFromLastMonth: 'No change from last month',
    increaseFromLastMonth: 'increase from last month',
    decreaseFromLastMonth: 'decrease from last month',
    upFromLastMonth: 'up from last month',
    downFromLastMonth: 'down from last month',
    
    // Time units
    active: 'active',
    pending: 'pending',
    docs: 'docs',
    depts: 'depts',
    thisWeek: 'this week',
    
    // Activity translations
    trackMaintenanceUpdated: 'Track Maintenance Schedule Updated',
    maintenanceScheduleDesc: 'Q4 2024 maintenance schedule has been uploaded with critical updates',
    safetyNoticePublished: 'Safety Notice Published',
    safetyGuidelinesDesc: 'New platform safety guidelines available in Malayalam',
    invoiceProcessingComplete: 'Invoice Processing Complete',
    siemensPaymentDesc: 'Siemens vendor payment has been processed successfully',
    complianceReviewRequired: 'Compliance Review Required',
    cmrsReportDesc: 'CMRS report requires immediate attention',
    hoursAgo: 'hours ago',
    
    // Connector translations
    connected: 'Connected',
    disconnected: 'Disconnected',
    syncing: 'Syncing',
    lastSync: 'Last sync',
    minutesAgo: 'minutes ago',
    syncingNow: 'Syncing now...',
    kmrlEmailSystem: 'KMRL Email System',
    metroDatabase: 'Metro Database',
    documentCloud: 'Document Cloud',
    vendorPortalApi: 'Vendor Portal API',
    emailIntegrationDesc: 'Official KMRL email integration for document reception',
    databaseConnectionDesc: 'Main operational database connection',
    cloudSyncDesc: 'Cloud storage synchronization',
    vendorApiDesc: 'External vendor document API',
    manageAll: 'Manage All',
    
    // Upload page translations
    uploadDocuments: 'Upload Documents',
    uploadToDocuMind: 'Upload new documents to the DocuMind AI processing system',
    uploadGuidelines: 'Upload Guidelines',
    supportedFileTypes: 'Supported File Types',
    pdfDocuments: 'PDF Documents (.pdf)',
    msWord: 'Microsoft Word (.doc, .docx)',
    msExcel: 'Microsoft Excel (.xls, .xlsx)',
    images: 'Images (.png, .jpg, .jpeg, .gif)',
    bestPractices: 'Best Practices',
    descriptiveFileNames: 'Use descriptive file names',
    maxFileSize: 'Maximum file size: 20MB',
    readableDocuments: 'Ensure documents are readable',
    relevantMetadata: 'Include relevant metadata',
    aiPoweredUpload: 'AI-Powered Document Upload',
    dragDropFiles: 'Drag and drop your files here, or click to browse',
    supportsFileTypes: 'Supports PDF, Word, Excel, and Images (Max 20MB per file)',
    automaticAISummarization: 'Automatic AI summarization and metadata extraction',
    browseFiles: 'Browse Files',
    uploadedFiles: 'Uploaded Files',
    processingInfo: 'Processing Information',
    aiProcessingDesc: 'Once uploaded, your documents will be automatically processed by our AI system to:',
    extractKeyInfo: 'Extract key information and metadata',
    classifyDocType: 'Classify document type and department',
    identifyUrgency: 'Identify urgency level and priority',
    generateSummaries: 'Generate searchable summaries',
    multilingualProcessing: 'Apply multilingual processing (English/Malayalam)',
    processingTime: 'Processing typically takes 1-3 minutes depending on document size and complexity.',
    
    // Documents page translations
    manageSearchDocuments: 'Manage and search through all your documents',
    showingResults: 'Showing',
    ofDocuments: 'of',
    documentsText: 'documents',
    latestFirst: 'Latest First',
    titleAZ: 'Title A-Z',
    urgency: 'Urgency',
    documentType: 'Document Type',
    clearAllFilters: 'Clear All Filters',
    noDocumentsFound: 'No Documents Found',
    adjustSearchTerms: 'Try adjusting your search terms or filters',
    
    // Role selector
    viewAs: 'View as',
    overallSystemOverview: 'Overall system overview',
    
    // Auction document specific Q&A
    auctionQuestions: [
      'What is the reserve price for the KMRL auction?',
      'When is the auction date and time?',
      'What items are included in the auction?',
      'Where can I inspect the items before the auction?',
      'What is the earnest money deposit amount?',
      'What are the terms and conditions for bidding?'
    ],
    auctionAnswers: [
      'The auction notice states that all items are sold on "as is where is" basis. No specific reserve price is mentioned for individual items.',
      'The auction is scheduled for December 28, 2024 at 10:00 AM at the KMRL Administrative Building.',
      'The auction includes railway track components (rails, sleepers, fastening systems), construction materials (cement, steel reinforcement), electrical equipment (cables, transformers, control panels), office furniture (desks, chairs, filing cabinets), and vehicle parts (bus spare parts and maintenance equipment).',
      'Inspection of items can be done on December 20-21, 2024 at the KMRL Administrative Building.',
      'The registration fee is ₹5,000 (non-refundable). This serves as the earnest money deposit.',
      'All items are sold "as is where is" basis. Payment must be made within 7 days of the auction. Registration fee of ₹5,000 is required and is non-refundable.'
    ]
  },
  
  hi: {
    dashboard: 'डैशबोर्ड',
    documents: 'दस्तावेज़',
    upload: 'अपलोड',
    search: 'खोज',
    alerts: 'अलर्ट',
    auditLogs: 'ऑडिट लॉग',
    analytics: 'एनालिटिक्स',
    settings: 'सेटिंग्स',
    engineering: 'इंजीनियरिंग',
    finance: 'वित्त',
    hr: 'मानव संसाधन',
    safety: 'सुरक्षा',
    legal: 'कानूनी',
    operations: 'संचालन',
    connectors: 'सिस्टम कनेक्टर',
    departments: 'विभाग',
    
    // Header translations
    notifications: 'सूचनाएं',
    allNotifications: 'सभी सूचनाएं',
    markAllAsRead: 'सभी को पढ़ा हुआ मार्क करें',
    
    // Dashboard metrics
    thisMonth: 'इस महीने',
    previousMonth: 'पिछले महीने की तुलना में',
    noChangeFromLastMonth: 'पिछले महीने से कोई बदलाव नहीं',
    increaseFromLastMonth: 'पिछले महीने से वृद्धि',
    decreaseFromLastMonth: 'पिछले महीने से कमी',
    upFromLastMonth: 'पिछले महीने से ऊपर',
    downFromLastMonth: 'पिछले महीने से नीचे',
    
    // Time units
    active: 'सक्रिय',
    pending: 'लंबित',
    docs: 'दस्तावेज़',
    depts: 'विभाग',
    thisWeek: 'इस सप्ताह',
    
    // Activity translations
    trackMaintenanceUpdated: 'ट्रैक रखरखाव अनुसूची अपडेट की गई',
    maintenanceScheduleDesc: 'Q4 2024 रखरखाव अनुसूची महत्वपूर्ण अपडेट के साथ अपलोड की गई है',
    safetyNoticePublished: 'सुरक्षा नोटिस प्रकाशित',
    safetyGuidelinesDesc: 'मलयालम में नई प्लेटफॉर्म सुरक्षा दिशानिर्देश उपलब्ध',
    invoiceProcessingComplete: 'इनवॉइस प्रसंस्करण पूर्ण',
    siemensPaymentDesc: 'सीमेंस विक्रेता भुगतान सफलतापूर्वक प्रसंस्करित',
    complianceReviewRequired: 'अनुपालन समीक्षा आवश्यक',
    cmrsReportDesc: 'CMRS रिपोर्ट को तत्काल ध्यान की आवश्यकता',
    hoursAgo: 'घंटे पहले',
    
    // Connector translations
    connected: 'कनेक्टेड',
    disconnected: 'डिसकनेक्टेड',
    syncing: 'सिंकिंग',
    lastSync: 'अंतिम सिंक',
    minutesAgo: 'मिनट पहले',
    syncingNow: 'अभी सिंक हो रहा है...',
    kmrlEmailSystem: 'KMRL ईमेल सिस्टम',
    metroDatabase: 'मेट्रो डेटाबेस',
    documentCloud: 'डॉक्यूमेंट क्लाउड',
    vendorPortalApi: 'विक्रेता पोर्टल API',
    emailIntegrationDesc: 'दस्तावेज़ रिसेप्शन के लिए आधिकारिक KMRL ईमेल एकीकरण',
    databaseConnectionDesc: 'मुख्य परिचालन डेटाबेस कनेक्शन',
    cloudSyncDesc: 'क्लाउड स्टोरेज सिंक्रोनाइज़ेशन',
    vendorApiDesc: 'बाहरी विक्रेता दस्तावेज़ API',
    manageAll: 'सभी प्रबंधित करें',
    
    // Upload page translations
    uploadDocuments: 'दस्तावेज़ अपलोड करें',
    uploadToDocuMind: 'DocuMind AI प्रसंस्करण सिस्टम में नए दस्तावेज़ अपलोड करें',
    uploadGuidelines: 'अपलोड दिशानिर्देश',
    supportedFileTypes: 'समर्थित फ़ाइल प्रकार',
    pdfDocuments: 'PDF दस्तावेज़ (.pdf)',
    msWord: 'Microsoft Word (.doc, .docx)',
    msExcel: 'Microsoft Excel (.xls, .xlsx)',
    images: 'छवियां (.png, .jpg, .jpeg, .gif)',
    bestPractices: 'सर्वोत्तम प्रथाएं',
    descriptiveFileNames: 'वर्णनात्मक फ़ाइल नाम का उपयोग करें',
    maxFileSize: 'अधिकतम फ़ाइल आकार: 20MB',
    readableDocuments: 'सुनिश्चित करें कि दस्तावेज़ पढ़ने योग्य हैं',
    relevantMetadata: 'प्रासंगिक मेटाडेटा शामिल करें',
    aiPoweredUpload: 'AI-संचालित दस्तावेज़ अपलोड',
    dragDropFiles: 'अपनी फ़ाइलों को यहाँ खींचें और छोड़ें, या ब्राउज़ करने के लिए क्लिक करें',
    supportsFileTypes: 'PDF, Word, Excel, और Images का समर्थन करता है (अधिकतम 20MB प्रति फ़ाइल)',
    automaticAISummarization: 'स्वचालित AI सारांश और मेटाडेटा निकासी',
    browseFiles: 'फ़ाइलें ब्राउज़ करें',
    uploadedFiles: 'अपलोड की गई फ़ाइलें',
    processingInfo: 'प्रसंस्करण जानकारी',
    aiProcessingDesc: 'अपलोड होने के बाद, आपके दस्तावेज़ स्वचालित रूप से हमारे AI सिस्टम द्वारा प्रसंस्करित होंगे:',
    extractKeyInfo: 'मुख्य जानकारी और मेटाडेटा निकालें',
    classifyDocType: 'दस्तावेज़ प्रकार और विभाग को वर्गीकृत करें',
    identifyUrgency: 'तात्कालिकता स्तर और प्राथमिकता की पहचान करें',
    generateSummaries: 'खोजने योग्य सारांश उत्पन्न करें',
    multilingualProcessing: 'बहुभाषी प्रसंस्करण लागू करें (अंग्रेजी/मलयालम)',
    processingTime: 'दस्तावेज़ के आकार और जटिलता के आधार पर प्रसंस्करण में आमतौर पर 1-3 मिनट लगते हैं।',
    
    // Documents page translations
    manageSearchDocuments: 'अपने सभी दस्तावेज़ों का प्रबंधन और खोज करें',
    showingResults: 'दिखा रहे हैं',
    ofDocuments: 'में से',
    documentsText: 'दस्तावेज़',
    latestFirst: 'नवीनतम पहले',
    titleAZ: 'शीर्षक A-Z',
    urgency: 'तात्कालिकता',
    documentType: 'दस्तावेज़ प्रकार',
    clearAllFilters: 'सभी फ़िल्टर साफ़ करें',
    noDocumentsFound: 'कोई दस्तावेज़ नहीं मिला',
    adjustSearchTerms: 'अपने खोज शब्दों या फ़िल्टर को समायोजित करने का प्रयास करें',
    
    // Role selector
    viewAs: 'के रूप में देखें',
    overallSystemOverview: 'समग्र सिस्टम अवलोकन',
    
    // Auction document specific Q&A
    auctionQuestions: [
      'KMRL नीलामी की आरक्षित कीमत क्या है?',
      'नीलामी की तारीख और समय कब है?',
      'नीलामी में कौन से आइटम शामिल हैं?',
      'नीलामी से पहले मैं वस्तुओं का निरीक्षण कहाँ कर सकता हूं?',
      'बयाना राशि जमा की राशि क्या है?',
      'बोली लगाने के नियम और शर्तें क्या हैं?'
    ],
    auctionAnswers: [
      'नीलामी सूचना में कहा गया है कि सभी वस्तुएं "जैसी हैं वैसी हैं" के आधार पर बेची जाती हैं। व्यक्तिगत वस्तुओं की कोई विशिष्ट आरक्षित कीमत नहीं दी गई है।',
      'नीलामी 28 दिसंबर, 2024 को सुबह 10:00 बजे KMRL प्रशासनिक भवन में निर्धारित है।',
      'नीलामी में रेलवे ट्रैक घटक (रेल, स्लीपर, फास्टनिंग सिस्टम), निर्माण सामग्री (सीमेंट, स्टील रीइन्फोर्समेंट), विद्युत उपकरण (केबल, ट्रांसफार्मर, कंट्रोल पैनल), कार्यालय फर्नीचर (डेस्क, कुर्सियां, फाइलिंग कैबिनेट), और वाहन पुर्जे (बस स्पेयर पार्ट्स और रखरखाव उपकरण) शामिल हैं।',
      'वस्तुओं का निरीक्षण 20-21 दिसंबर, 2024 को KMRL प्रशासनिक भवन में किया जा सकता है।',
      'पंजीकरण शुल्क ₹5,000 (गैर-वापसी योग्य) है। यह बयाना राशि जमा के रूप में काम करता है।',
      'सभी वस्तुएं "जैसी हैं वैसी हैं" के आधार पर बेची जाती हैं। नीलामी के 7 दिनों के भीतर भुगतान करना होगा। ₹5,000 का पंजीकरण शुल्क आवश्यक है और यह गैर-वापसी योग्य है।'
    ]
  },
  
  ml: {
    dashboard: 'ഡാഷ്ബോർഡ്',
    documents: 'രേഖകൾ',
    upload: 'അപ്ലോഡ്',
    search: 'തിരയുക',
    alerts: 'അലർട്ടുകൾ',
    auditLogs: 'ഓഡിറ്റ് ലോഗുകൾ',
    analytics: 'അനലിറ്റിക്സ്',
    settings: 'ക്രമീകരണങ്ങൾ',
    engineering: 'എഞ്ചിനീയറിംഗ്',
    finance: 'ധനകാര്യം',
    hr: 'മനുഷ്യ വിഭവങ്ങൾ',
    safety: 'സുരക്ഷ',
    legal: 'നിയമപരം',
    operations: 'പ്രവർത്തനങ്ങൾ',
    connectors: 'സിസ്റ്റം കണക്ടറുകൾ',
    departments: 'വകുപ്പുകൾ',
    
    // Header translations
    notifications: 'അറിയിപ്പുകൾ',
    allNotifications: 'എല്ലാ അറിയിപ്പുകളും',
    markAllAsRead: 'എല്ലാം വായിച്ചതായി അടയാളപ്പെടുത്തുക',
    
    // Dashboard metrics
    thisMonth: 'ഈ മാസം',
    previousMonth: 'മുൻ മാസത്തെ അപേക്ഷിച്ച്',
    noChangeFromLastMonth: 'കഴിഞ്ഞ മാസത്തിൽ നിന്ന് മാറ്റമില്ല',
    increaseFromLastMonth: 'കഴിഞ്ഞ മാസത്തിൽ നിന്ന് വർദ്ധനവ്',
    decreaseFromLastMonth: 'കഴിഞ്ഞ മാസത്തിൽ നിന്ന് കുറവ്',
    upFromLastMonth: 'കഴിഞ്ഞ മാസത്തിൽ നിന്ന് മുകളിലേക്ക്',
    downFromLastMonth: 'കഴിഞ്ഞ മാസത്തിൽ നിന്ന് താഴേക്ക്',
    
    // Time units
    active: 'സജീവം',
    pending: 'തീർപ്പുകൽപ്പിക്കാത്ത',
    docs: 'രേഖകൾ',
    depts: 'വകുപ്പുകൾ',
    thisWeek: 'ഈ ആഴ്ച',
    
    // Activity translations
    trackMaintenanceUpdated: 'ട്രാക്ക് മെയിന്റനൻസ് ഷെഡ്യൂൾ അപ്ഡേറ്റ് ചെയ്തു',
    maintenanceScheduleDesc: 'Q4 2024 മെയിന്റനൻസ് ഷെഡ്യൂൾ നിർണായക അപ്ഡേറ്റുകളോടെ അപ്ലോഡ് ചെയ്തു',
    safetyNoticePublished: 'സുരക്ഷാ അറിയിപ്പ് പ്രസിദ്ധീകരിച്ചു',
    safetyGuidelinesDesc: 'മലയാളത്തിൽ പുതിയ പ്ലാറ്റ്ഫോം സുരക്ഷാ മാർഗ്ഗനിർദ്ദേശങ്ങൾ ലഭ്യം',
    invoiceProcessingComplete: 'ഇൻവോയിസ് പ്രോസസ്സിംഗ് പൂർത്തിയായി',
    siemensPaymentDesc: 'സീമെൻസ് വെണ്ടർ പേയ്മെന്റ് വിജയകരമായി പ്രോസസ്സ് ചെയ്തു',
    complianceReviewRequired: 'കംപ്ലയൻസ് അവലോകനം ആവശ്യം',
    cmrsReportDesc: 'CMRS റിപ്പോർട്ടിന് അടിയന്തര ശ്രദ്ധ ആവശ്യം',
    hoursAgo: 'മണിക്കൂർ മുമ്പ്',
    
    // Connector translations
    connected: 'കണക്റ്റഡ്',
    disconnected: 'ഡിസ്കണക്റ്റഡ്',
    syncing: 'സിങ്ക് ചെയ്യുന്നു',
    lastSync: 'അവസാന സിങ്ക്',
    minutesAgo: 'മിനിറ്റ് മുമ്പ്',
    syncingNow: 'ഇപ്പോൾ സിങ്ക് ചെയ്യുന്നു...',
    kmrlEmailSystem: 'KMRL ഇമെയിൽ സിസ്റ്റം',
    metroDatabase: 'മെട്രോ ഡേറ്റാബേസ്',
    documentCloud: 'ഡോക്യുമെന്റ് ക്ലൗഡ്',
    vendorPortalApi: 'വെണ്ടർ പോർട്ടൽ API',
    emailIntegrationDesc: 'ഡോക്യുമെന്റ് റിസപ്ഷനായി ഔദ്യോഗിക KMRL ഇമെയിൽ ഇന്റഗ്രേഷൻ',
    databaseConnectionDesc: 'പ്രധാന പ്രവർത്തന ഡേറ്റാബേസ് കണക്ഷൻ',
    cloudSyncDesc: 'ക്ലൗഡ് സ്റ്റോറേജ് സിൻക്രൊണൈസേഷൻ',
    vendorApiDesc: 'ബാഹ്യ വെണ്ടർ ഡോക്യുമെന്റ് API',
    manageAll: 'എല്ലാം കൈകാര്യം ചെയ്യുക',
    
    // Upload page translations
    uploadDocuments: 'രേഖകൾ അപ്ലോഡ് ചെയ്യുക',
    uploadToDocuMind: 'DocuMind AI പ്രോസസ്സിംഗ് സിസ്റ്റത്തിൽ പുതിയ രേഖകൾ അപ്ലോഡ് ചെയ്യുക',
    uploadGuidelines: 'അപ്ലോഡ് മാർഗ്ഗനിർദ്ദേശങ്ങൾ',
    supportedFileTypes: 'പിന്തുണയുള്ള ഫയൽ തരങ്ങൾ',
    pdfDocuments: 'PDF രേഖകൾ (.pdf)',
    msWord: 'Microsoft Word (.doc, .docx)',
    msExcel: 'Microsoft Excel (.xls, .xlsx)',
    images: 'ചിത്രങ്ങൾ (.png, .jpg, .jpeg, .gif)',
    bestPractices: 'മികച്ച രീതികൾ',
    descriptiveFileNames: 'വിവരണാത്മക ഫയൽ പേരുകൾ ഉപയോഗിക്കുക',
    maxFileSize: 'പരമാവധി ഫയൽ വലുപ്പം: 20MB',
    readableDocuments: 'രേഖകൾ വായിക്കാവുന്നതാണെന്ന് ഉറപ്പാക്കുക',
    relevantMetadata: 'പ്രസക്തമായ മെറ്റാഡേറ്റ ഉൾപ്പെടുത്തുക',
    aiPoweredUpload: 'AI-പവർഡ് ഡോക്യുമെന്റ് അപ്ലോഡ്',
    dragDropFiles: 'നിങ്ങളുടെ ഫയലുകൾ ഇവിടെ വലിച്ചിട്ട് വിടുക, അല്ലെങ്കിൽ ബ്രൗസ് ചെയ്യാൻ ക്ലിക്ക് ചെയ്യുക',
    supportsFileTypes: 'PDF, Word, Excel, Images എന്നിവയെ പിന്തുണയ്ക്കുന്നു (ഫയലിന് പരമാവധി 20MB)',
    automaticAISummarization: 'ഓട്ടോമാറ്റിക് AI സംഗ്രഹവും മെറ്റാഡേറ്റ എക്സ്ട്രാക്ഷനും',
    browseFiles: 'ഫയലുകൾ ബ്രൗസ് ചെയ്യുക',
    uploadedFiles: 'അപ്ലോഡ് ചെയ്ത ഫയലുകൾ',
    processingInfo: 'പ്രോസസ്സിംഗ് വിവരങ്ങൾ',
    aiProcessingDesc: 'അപ്ലോഡ് ചെയ്തതിന് ശേഷം, നിങ്ങളുടെ രേഖകൾ ഞങ്ങളുടെ AI സിസ്റ്റം ഓട്ടോമാറ്റിക്കായി പ്രോസസ്സ് ചെയ്യും:',
    extractKeyInfo: 'പ്രധാന വിവരങ്ങളും മെറ്റാഡേറ്റയും എക്സ്ട്രാക്റ്റ് ചെയ്യുക',
    classifyDocType: 'ഡോക്യുമെന്റ് തരവും വകുപ്പും വർഗ്ഗീകരിക്കുക',
    identifyUrgency: 'അടിയന്തിര നിലയും മുൻഗണനയും തിരിച്ചറിയുക',
    generateSummaries: 'തിരയാവുന്ന സംഗ്രഹങ്ങൾ സൃഷ്ടിക്കുക',
    multilingualProcessing: 'ബഹുഭാഷാ പ്രോസസ്സിംഗ് പ്രയോഗിക്കുക (ഇംഗ്ലീഷ്/മലയാളം)',
    processingTime: 'ഡോക്യുമെന്റ് വലുപ്പവും സങ്കീർണ്ണതയും അനുസരിച്ച് പ്രോസസ്സിംഗിന് സാധാരണയായി 1-3 മിനിറ്റ് എടുക്കും.',
    
    // Documents page translations
    manageSearchDocuments: 'നിങ്ങളുടെ എല്ലാ ഡോക്യുമെന്റുകളും കൈകാര്യം ചെയ്യുകയും തിരയുകയും ചെയ്യുക',
    showingResults: 'കാണിക്കുന്നു',
    ofDocuments: 'ൽ',
    documentsText: 'ഡോക്യുമെന്റുകൾ',
    latestFirst: 'ഏറ്റവും പുതിയത് ആദ്യം',
    titleAZ: 'ശീർഷകം A-Z',
    urgency: 'അടിയന്തിരത',
    documentType: 'ഡോക്യുമെന്റ് തരം',
    clearAllFilters: 'എല്ലാ ഫിൽട്ടറുകളും മായ്ക്കുക',
    noDocumentsFound: 'ഡോക്യുമെന്റുകൾ കണ്ടെത്തിയില്ല',
    adjustSearchTerms: 'നിങ്ങളുടെ തിരയൽ പദങ്ങളോ ഫിൽട്ടറുകളോ ക്രമീകരിക്കാൻ ശ്രമിക്കുക',
    
    // Role selector
    viewAs: 'ആയി കാണുക',
    overallSystemOverview: 'മൊത്തത്തിലുള്ള സിസ്റ്റം അവലോകനം',
    
    // Auction document specific Q&A
    auctionQuestions: [
      'KMRL നീലാമിന്റെ റിസർവ് വില എന്താണ്?',
      'നീലാമിന്റെ തീയതിയും സമയവും എപ്പോഴാണ്?',
      'നീലാമിൽ ഏതെല്ലാം ഇനങ്ങൾ ഉൾപ്പെടുന്നു?',
      'നീലാമിന് മുമ്പ് എനിക്ക് എവിടെ വസ്തുക്കൾ പരിശോധിക്കാം?',
      'ജാമ്യ തുക എത്രയാണ്?',
      'ലേലത്തിനുള്ള നിയമങ്ങളും വ്യവസ്ഥകളും എന്തൊക്കെയാണ്?'
    ],
    auctionAnswers: [
      'നീലാമി അറിയിപ്പിൽ എല്ലാ ഇനങ്ങളും "ഏതായാലും എവിടെയായാലും" അടിസ്ഥാനത്തിൽ വിൽക്കുന്നുവെന്ന് പറയുന്നു. വ്യക്തിഗത ഇനങ്ങൾക്ക് പ്രത്യേക റിസർവ് വില പരാമർശിച്ചിട്ടില്ല.',
      'നീലാമി ഡിസംബർ 28, 2024 രാവിലെ 10:00 മണിക്ക് KMRL അഡ്മിനിസ്ട്രേറ്റീവ് ബിൽഡിംഗിൽ നിർദ്ദിഷ്ടമാണ്.',
      'നീലാമിൽ റെയിൽവേ ട്രാക്ക് ഘടകങ്ങൾ (റെയിലുകൾ, സ്ലീപ്പറുകൾ, ഫാസ്റ്റനിംഗ് സിസ്റ്റങ്ങൾ), നിർമ്മാണ സാമഗ്രികൾ (സിമന്റ്, സ്റ്റീൽ റീഇൻഫോഴ്സ്മെന്റ്), ഇലക്ട്രിക്കൽ ഉപകരണങ്ങൾ (കേബിളുകൾ, ട്രാൻസ്ഫോർമറുകൾ, കൺട്രോൾ പാനലുകൾ), ഓഫീസ് ഫർണിച്ചറുകൾ (ഡെസ്കുകൾ, കസേരകൾ, ഫയലിംഗ് കാബിനറ്റുകൾ), വാഹന ഭാഗങ്ങൾ (ബസ് സ്പെയർ പാർട്സും മെയിന്റനൻസ് ഉപകരണങ്ങളും) എന്നിവ ഉൾപ്പെടുന്നു.',
      'ഇനങ്ങളുടെ പരിശോധന ഡിസംബർ 20-21, 2024 ൽ KMRL അഡ്മിനിസ്ട്രേറ്റീവ് ബിൽഡിംഗിൽ നടത്താം.',
      'രജിസ്ട്രേഷൻ ഫീസ് ₹5,000 (നോൺ-റിഫണ്ടബിൾ) ആണ്. ഇത് ജാമ്യ തുകയായി പ്രവർത്തിക്കുന്നു.',
      'എല്ലാ ഇനങ്ങളും "ഏതായാലും എവിടെയായാലും" അടിസ്ഥാനത്തിൽ വിൽക്കുന്നു. നീലാമിക്ക് ശേഷം 7 ദിവസത്തിനുള്ളിൽ പേയ്മെന്റ് നടത്തണം. ₹5,000 രജിസ്ട്രേഷൻ ഫീസ് ആവശ്യമാണ്, അത് തിരികെ ലഭിക്കുന്നതല്ല.'
    ]
  }
};

const documentTranslations = {
  en: [
    {
      title: "KMRL Public Auction Notice - Surplus Materials Sale",
      summary: "Official auction notice from Kochi Metro Rail Limited for surplus materials including track components, construction materials, electrical equipment, office furniture, and vehicle parts. Auction scheduled for December 28, 2024 with registration fee of ₹5,000.",
      urgency: "Review",
      type: "Regulatory Directive",
      department: "Procurement",
      tags: ["AI-Processed", "Legal/Regulatory", "Analytics-Ready"]
    },
    {
      title: "Track Maintenance Schedule Q4 2024", 
      summary: "Comprehensive maintenance schedule for track sections requiring immediate attention before monsoon season.",
      urgency: "Critical",
      type: "Engineering Doc",
      department: "Engineering",
      tags: ["maintenance", "tracks", "critical"]
    },
    {
      title: "Vendor Payment Invoice - Siemens",
      summary: "Invoice for electrical equipment maintenance and spare parts delivery.",
      urgency: "Review", 
      type: "Invoice",
      department: "Finance",
      tags: ["payment", "vendor", "siemens"]
    },
    {
      title: "Platform Area Safety Guidelines",
      summary: "Platform area safety guidelines for staff during peak hours and emergency procedures.",
      urgency: "Critical",
      type: "Safety Notice", 
      department: "Safety",
      tags: ["safety", "platform", "malayalam"]
    },
    {
      title: "New Employee Onboarding Checklist",
      summary: "Updated onboarding process for new technical staff including safety certification requirements.",
      urgency: "Info",
      type: "HR",
      department: "HR", 
      tags: ["hr", "onboarding", "certification"]
    },
    {
      title: "CMRS Compliance Report 2024",
      summary: "Annual compliance report for Commissioner of Metro Rail Safety with pending action items.",
      urgency: "Critical",
      type: "Regulatory Directive",
      department: "Safety",
      tags: ["compliance", "cmrs", "regulatory"]
    },
    {
      title: "Rolling Stock Maintenance Log",
      summary: "Daily maintenance logs for all active metro coaches with identified issues and resolutions.",
      urgency: "Review",
      type: "Engineering Doc", 
      department: "Engineering",
      tags: ["maintenance", "rolling-stock", "daily-log"]
    }
  ],
  hi: [
    {
      title: "केएमआरएल सार्वजनिक नीलामी सूचना - अधिशेष सामग्री बिक्री",
      summary: "कोच्चि मेट्रो रेल लिमिटेड की अधिशेष सामग्री जैसे ट्रैक घटक, निर्माण सामग्री, विद्युत उपकरण, कार्यालय फर्नीचर और वाहन के पुर्ज़ों के लिए आधिकारिक नीलामी सूचना।",
      urgency: "समीक्षा",
      type: "नियामक निर्देश", 
      department: "क्रय",
      tags: ["एआई-प्रसंस्कृत", "कानूनी/नियामक", "विश्लेषण-तैयार"]
    },
    {
      title: "ट्रैक रखरखाव अनुसूची Q4 2024",
      summary: "मानसून से पहले तत्काल ध्यान की आवश्यकता वाले ट्रैक सेक्शन की व्यापक रखरखाव अनुसूची।",
      urgency: "महत्वपूर्ण",
      type: "इंजीनियरिंग दस्तावेज़",
      department: "इंजीनियरिंग", 
      tags: ["रखरखाव", "ट्रैक", "महत्वपूर्ण"]
    },
    {
      title: "विक्रेता भुगतान चालान - सीमेंस",
      summary: "विद्युत उपकरणों के रखरखाव और स्पेयर पार्ट्स डिलीवरी का चालान।",
      urgency: "समीक्षा",
      type: "चालान",
      department: "वित्त",
      tags: ["भुगतान", "विक्रेता", "सीमेंस"]
    },
    {
      title: "प्लेटफ़ॉर्म क्षेत्र सुरक्षा दिशानिर्देश", 
      summary: "भीड़ के समय और आपातकालीन प्रक्रियाओं के दौरान कर्मचारियों के लिए प्लेटफ़ॉर्म क्षेत्र सुरक्षा दिशानिर्देश।",
      urgency: "महत्वपूर्ण",
      type: "सुरक्षा सूचना",
      department: "सुरक्षा",
      tags: ["सुरक्षा", "प्लेटफ़ॉर्म", "मलयालम"]
    },
    {
      title: "नए कर्मचारी ऑनबोर्डिंग चेकलिस्ट",
      summary: "नए तकनीकी कर्मचारियों के लिए सुरक्षा प्रमाणन आवश्यकताओं सहित अद्यतन ऑनबोर्डिंग प्रक्रिया।",
      urgency: "सूचना",
      type: "मानव संसाधन",
      department: "एचआर",
      tags: ["एचआर", "ऑनबोर्डिंग", "प्रमाणीकरण"]
    },
    {
      title: "सीएमआरएस अनुपालन रिपोर्ट 2024",
      summary: "मेट्रो रेल सुरक्षा आयुक्त के लिए वार्षिक अनुपालन रिपोर्ट जिसमें लंबित कार्य शामिल हैं।",
      urgency: "महत्वपूर्ण",
      type: "नियामक निर्देश",
      department: "सुरक्षा",
      tags: ["अनुपालन", "सीएमआरएस", "नियामक"]
    },
    {
      title: "रोलिंग स्टॉक रखरखाव लॉग",
      summary: "सभी सक्रिय मेट्रो कोचों के लिए दैनिक रखरखाव लॉग जिसमें पहचानी गई समस्याएं और समाधान शामिल हैं।",
      urgency: "समीक्षा", 
      type: "इंजीनियरिंग दस्तावेज़",
      department: "इंजीनियरिंग",
      tags: ["रखरखाव", "रोलिंग-स्टॉक", "दैनिक-लॉग"]
    }
  ],
  ml: [
    {
      title: "കെഎംആർഎൽ പൊതുവില്പന അറിയിപ്പ് - അധിക സാമഗ്രികളുടെ ലേലം",
      summary: "കോച്ചി മെട്രോ റെയിൽ ലിമിറ്റഡിന്റെ അധിക സാമഗ്രികൾക്ക്, ട്രാക്ക് ഘടകങ്ങൾ, നിർമ്മാണ സാമഗ്രികൾ, വൈദ്യുതി ഉപകരണങ്ങൾ, ഓഫീസ് ഫർണിച്ചർ, വാഹന ഭാഗങ്ങൾ ഉൾപ്പെടെ ഔദ്യോഗിക ലേലം അറിയിപ്പ്।",
      urgency: "റിവ്യൂ",
      type: "നിയന്ത്രണ നിർദ്ദേശം",
      department: "പ്രോക്യൂർമെന്റ്",
      tags: ["AI-പ്രോസസ്ഡ്", "നിയമ/നിയന്ത്രണ", "വിശകലന-തയ്യാർ"]
    },
    {
      title: "ട്രാക്ക് പരിപാലന ഷെഡ്യൂൾ Q4 2024",
      summary: "മൺസൂൺ സീസണിന് മുമ്പ് അടിയന്തര ശ്രദ്ധ ആവശ്യമായ ട്രാക്ക് സെക്ഷനുകളുടെ സമഗ്രമായ പരിപാലന ഷെഡ്യൂൾ.",
      urgency: "ക്രിറ്റിക്കൽ",
      type: "എഞ്ചിനീയറിംഗ് ഡോക്",
      department: "എഞ്ചിനീയറിംഗ്",
      tags: ["പരിപാലനം", "ട്രാക്കുകൾ", "ക്രിറ്റിക്കൽ"]
    },
    {
      title: "വെൻഡർ പേയ്മെന്റ് ഇൻവോയ്സ് - സിമൻസ്", 
      summary: "വൈദ്യുതി ഉപകരണ പരിപാലനത്തിനും സ്പെയർ പാർട്സ് വിതരണത്തിനും വേണ്ട ഇൻവോയ്സ്।",
      urgency: "റിവ്യൂ",
      type: "ഇൻവോയ്സ്",
      department: "ഫിനാൻസ്",
      tags: ["പേയ്മെന്റ്", "വെൻഡർ", "സിമൻസ്"]
    },
    {
      title: "സുരക്ഷാ നിർദ്ദേശങ്ങൾ - പ്ലാറ്റ്ഫോം ഏരിയ",
      summary: "പീക്ക് സമയങ്ങളിലും അടിയന്തര നടപടികളിലും സ്റ്റാഫിനായി പ്ലാറ്റ്ഫോം ഏരിയ സുരക്ഷാ നിർദ്ദേശങ്ങൾ.",
      urgency: "ക്രിറ്റിക്കൽ", 
      type: "സേഫ്റ്റി നോട്ടീസ്",
      department: "സേഫ്റ്റി",
      tags: ["സുരക്ഷ", "പ്ലാറ്റ്ഫോം", "മലയാളം"]
    },
    {
      title: "പുതിയ ജീവനക്കാരുടെ ഓൺബോർഡിംഗ് ചെക്ക്ലിസ്റ്റ്",
      summary: "പുതിയ ടെക്നിക്കൽ സ്റ്റാഫിനുള്ള സുരക്ഷാ സർട്ടിഫിക്കേഷൻ ആവശ്യകതകൾ ഉൾപ്പെടെയുള്ള പുതുക്കിയ ഓൺബോർഡിംഗ് പ്രക്രിയ.",
      urgency: "ഇൻഫോ",
      type: "എച്ച്ആർ",
      department: "എച്ച്ആർ",
      tags: ["എച്ച്ആർ", "ഓൺബോർഡിംഗ്", "സർട്ടിഫിക്കേഷൻ"]
    },
    {
      title: "CMRS കംപ്ലയൻസ് റിപ്പോർട്ട് 2024",
      summary: "മെട്രോ റെയിൽ സുരക്ഷാ കമ്മീഷണറുടെ വാർഷിക കംപ്ലയൻസ് റിപ്പോർട്ട്, ബാക്കിയുള്ള പ്രവർത്തന ഇനങ്ങളോടൊപ്പം।",
      urgency: "ക്രിറ്റിക്കൽ",
      type: "നിയന്ത്രണ നിർദ്ദേശം",
      department: "സേഫ്റ്റി",
      tags: ["കംപ്ലയൻസ്", "CMRS", "നിയന്ത്രണ"]
    },
    {
      title: "റോളിംഗ് സ്റ്റോക്ക് പരിപാലന ലോഗ്",
      summary: "എല്ലാ സജീവ മെട്രോ കോച്ചുകൾക്കായുള്ള ദിനസരിപാലന ലോഗുകൾ, കണ്ടെത്തിയ പ്രശ്നങ്ങളും പരിഹാരങ്ങളും ഉൾപ്പെടെ.",
      urgency: "റിവ്യൂ",
      type: "എഞ്ചിനീയറിംഗ് ഡോക്",
      department: "എഞ്ചിനീയറിംഗ്",
      tags: ["പരിപാലനം", "റോളിംഗ്-സ്റ്റോക്ക്", "ഡെയിലി-ലോഗ്"]
    }
  ]
};

const connectorTranslations = {
  en: [
    { title: "Email", description: "Inbox & attachments", lastSync: "Last sync: 2 minutes ago" },
    { title: "Maximo Exports", description: "Maintenance & job cards", lastSync: "Last sync: 15 minutes ago" },
    { title: "SharePoint", description: "Document repositories", lastSync: "Last sync: 1 hour ago" },
    { title: "WhatsApp", description: "PDFs & scanned documents" },
    { title: "Hard-Copy Scans", description: "Drag-and-drop uploads", lastSync: "Last sync: 30 minutes ago" },
    { title: "Ad-Hoc Cloud Links", description: "External file sharing", lastSync: "Last sync: 2 hours ago" }
  ],
  hi: [
    { title: "ईमेल", description: "इनबॉक्स और संलग्नक", lastSync: "अंतिम समन्वय: 2 मिनट पहले" },
    { title: "मैक्सिमो निर्यात", description: "रखरखाव और जॉब कार्ड", lastSync: "अंतिम समन्वय: 15 मिनट पहले" },
    { title: "शेयरपॉइंट", description: "दस्तावेज़ भंडार", lastSync: "अंतिम समन्वय: 1 घंटा पहले" },
    { title: "व्हाट्सएप", description: "पीडीएफ और स्कैन किए गए दस्तावेज़" },
    { title: "हार्ड-कॉपी स्कैन", description: "ड्रैग-एंड-ड्रॉप अपलोड", lastSync: "अंतिम समन्वय: 30 मिनट पहले" },
    { title: "एड-हॉक क्लाउड लिंक", description: "बाहरी फ़ाइल साझा करना", lastSync: "अंतिम समन्वय: 2 घंटे पहले" }
  ],
  ml: [
    { title: "ഇമെയിൽ", description: "ഇൻബോക്സ് & അറ്റാച്ച്മെന്റുകൾ", lastSync: "അവസാന സിങ്ക്: 2 മിനിറ്റ് മുമ്പ്" },
    { title: "മാക്സിമോ എക്സ്പോർട്ടുകൾ", description: "മെന്റനൻസ് & ജോബ് കാർഡുകൾ", lastSync: "അവസാന സിങ്ക്: 15 മിനിറ്റ് മുമ്പ്" },
    { title: "ഷെയർപോയിന്റ്", description: "ഡോക്യുമെന്റ് റെപ്പോസിറ്ററികൾ", lastSync: "അവസാന സിങ്ക്: 1 മണിക്കൂർ മുമ്പ്" },
    { title: "വാട്ട്സ്ആപ്പ്", description: "PDFകളും സ്കാൻ ചെയ്ത ഡോക്യുമെന്റുകളും" },
    { title: "ഹാർഡ്-കോപ്പി സ്കാൻസ്", description: "ഡ്രാഗ്-അൻഡ്-ഡ്രോപ്പ് അപ്ലോഡുകൾ", lastSync: "അവസാന സിങ്ക്: 30 മിനിറ്റ് മുമ്പ്" },
    { title: "ആഡ്-ഹോക്ക് ക്ലൗഡ് ലിങ്കുകൾ", description: "ബാഹ്യ ഫയൽ ഷെയറിംഗ്", lastSync: "അവസാന സിങ്ക്: 2 മണിക്കൂർ മുമ്പ്" }
  ]
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): any => {
    if (key === 'documentData') {
      return documentTranslations;
    }
    if (key === 'connectorData') {
      return connectorTranslations;
    }
    
    // For other string translations
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}