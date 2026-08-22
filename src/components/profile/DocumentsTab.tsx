import React, { useState } from 'react';
import { FileText, Download, Eye, Plus, Upload, X, Check, ShieldCheck } from 'lucide-react';

export const DocumentsTab: React.FC = () => {
  const [documents, setDocuments] = useState([
    {
      id: 'doc_1',
      title: 'Janani_Devi_Resume_2026.pdf',
      category: 'Resume / CV',
      uploadedDate: '10 Jan 2026',
      size: '2.4 MB',
    },
    {
      id: 'doc_2',
      title: 'Offer_Letter_Dayflow.pdf',
      category: 'Offer Letter',
      uploadedDate: '01 Jan 2023',
      size: '1.1 MB',
    },
    {
      id: 'doc_3',
      title: 'Government_ID_Verification.pdf',
      category: 'Identity Proof',
      uploadedDate: '05 Jan 2023',
      size: '3.8 MB',
    },
    {
      id: 'doc_4',
      title: 'BTech_Degree_Certificate.pdf',
      category: 'Academic Record',
      uploadedDate: '05 Jan 2023',
      size: '4.2 MB',
    },
  ]);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newDocCategory, setNewDocCategory] = useState('Resume / CV');
  const [newDocFile, setNewDocFile] = useState<File | null>(null);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocFile) return;

    setDocuments([
      ...documents,
      {
        id: Date.now().toString(),
        title: newDocFile.name,
        category: newDocCategory,
        uploadedDate: 'Today',
        size: `${(newDocFile.size / (1024 * 1024)).toFixed(1)} MB`,
      },
    ]);
    setNewDocFile(null);
    setShowUploadModal(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Documents & Resumes</h2>
          <p className="text-xs text-slate-500 font-medium">
            Manage official employee files, verification identity documents, and resumes
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-xs shadow-md shadow-blue-600/20 transition-all cursor-pointer"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:shadow-xs transition-all flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3.5 overflow-hidden">
                <div className="w-10 h-10 rounded-xl bg-blue-100/80 text-blue-600 flex items-center justify-center font-bold flex-shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{doc.title}</h4>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                    <span className="font-semibold text-slate-600">{doc.category}</span>
                    <span>•</span>
                    <span>{doc.size}</span>
                    <span>•</span>
                    <span>{doc.uploadedDate}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1.5 flex-shrink-0">
                <button
                  onClick={() => alert(`Previewing ${doc.title}`)}
                  className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                  title="Preview"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => alert(`Downloading ${doc.title}`)}
                  className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                  title="Download"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upload Document Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleUpload}
            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Upload New Document</h3>
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Document Category
              </label>
              <select
                value={newDocCategory}
                onChange={(e) => setNewDocCategory(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="Resume / CV">Resume / CV</option>
                <option value="Offer Letter">Offer Letter</option>
                <option value="Identity Proof">Identity Proof</option>
                <option value="Academic Record">Academic Record</option>
                <option value="Other">Other Document</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Select File</label>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors bg-slate-50/50">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <input
                  type="file"
                  required
                  onChange={(e) => setNewDocFile(e.target.files ? e.target.files[0] : null)}
                  className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs"
              >
                Upload File
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
