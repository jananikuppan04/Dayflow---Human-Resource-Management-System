import React, { useState } from 'react';
import { Edit2, Plus, Award, Code, Check, X, Sparkles, Heart, Smile } from 'lucide-react';

export const ResumeTab: React.FC = () => {
  const [aboutText, setAboutText] = useState(
    'Passionate Software Engineer with 4+ years of experience building modern enterprise applications, high-performance web systems, and intuitive user interfaces. Strong focus on clean architecture, scalable frontend development, and seamless UX.'
  );

  const [jobLoveText, setJobLoveText] = useState(
    'I love tackling complex engineering challenges, designing elegant user-centric products, collaborating with talented cross-functional teams, and continuously learning emerging web technologies.'
  );

  const [hobbiesText, setHobbiesText] = useState(
    'Tech blogging, open-source contributing, digital photography, badmintion, chess, and exploring new coffee cafes.'
  );

  const [skills, setSkills] = useState([
    { id: '1', name: 'React.js', level: 'Expert' },
    { id: '2', name: 'TypeScript', level: 'Advanced' },
    { id: '3', name: 'Node.js', level: 'Advanced' },
    { id: '4', name: 'Tailwind CSS', level: 'Expert' },
    { id: '5', name: 'REST APIs', level: 'Advanced' },
    { id: '6', name: 'System Design', level: 'Intermediate' },
  ]);

  const [certifications, setCertifications] = useState([
    { id: '1', title: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', date: '2025' },
    { id: '2', title: 'Meta Certified Professional Developer', issuer: 'Meta', date: '2024' },
  ]);

  // Edit modals state
  const [editingField, setEditingField] = useState<'about' | 'jobLove' | 'hobbies' | null>(null);
  const [tempText, setTempText] = useState('');

  const [showSkillModal, setShowSkillModal] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState('Intermediate');

  const [showCertModal, setShowCertModal] = useState(false);
  const [newCertTitle, setNewCertTitle] = useState('');
  const [newCertIssuer, setNewCertIssuer] = useState('');
  const [newCertDate, setNewCertDate] = useState('2026');

  const handleStartEdit = (field: 'about' | 'jobLove' | 'hobbies', currentVal: string) => {
    setEditingField(field);
    setTempText(currentVal);
  };

  const handleSaveEdit = () => {
    if (editingField === 'about') setAboutText(tempText);
    if (editingField === 'jobLove') setJobLoveText(tempText);
    if (editingField === 'hobbies') setHobbiesText(tempText);
    setEditingField(null);
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    setSkills([
      ...skills,
      { id: Date.now().toString(), name: newSkillName.trim(), level: newSkillLevel },
    ]);
    setNewSkillName('');
    setShowSkillModal(false);
  };

  const handleAddCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCertTitle.trim()) return;
    setCertifications([
      ...certifications,
      {
        id: Date.now().toString(),
        title: newCertTitle.trim(),
        issuer: newCertIssuer.trim() || 'Professional Body',
        date: newCertDate,
      },
    ]);
    setNewCertTitle('');
    setNewCertIssuer('');
    setShowCertModal(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols wide): About, Job Love, Interests */}
        <div className="lg:col-span-2 space-y-6">
          {/* About Me Card */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs relative group">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">About</h3>
              </div>
              <button
                onClick={() => handleStartEdit('about', aboutText)}
                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                title="Edit About section"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">{aboutText}</p>
          </div>

          {/* What I Love About My Job */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs relative group">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-500" />
                <h3 className="text-base font-bold text-slate-900">What I love about my job</h3>
              </div>
              <button
                onClick={() => handleStartEdit('jobLove', jobLoveText)}
                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                title="Edit section"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">{jobLoveText}</p>
          </div>

          {/* My Interests & Hobbies */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs relative group">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Smile className="w-4 h-4 text-amber-500" />
                <h3 className="text-base font-bold text-slate-900">My interests and hobbies</h3>
              </div>
              <button
                onClick={() => handleStartEdit('hobbies', hobbiesText)}
                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer"
                title="Edit section"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">{hobbiesText}</p>
          </div>
        </div>

        {/* Right Column (1 col wide): Skills & Certifications */}
        <div className="lg:col-span-1 space-y-6">
          {/* Skills Section */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">Skills</h3>
              </div>
              <button
                onClick={() => setShowSkillModal(true)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Skill</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1.5"
                >
                  <span>{skill.name}</span>
                  <span className="text-[10px] text-slate-400 font-normal">({skill.level})</span>
                </span>
              ))}
            </div>
          </div>

          {/* Certifications Section */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">Certifications</h3>
              </div>
              <button
                onClick={() => setShowCertModal(true)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Cert</span>
              </button>
            </div>

            <div className="space-y-3">
              {certifications.map((cert) => (
                <div key={cert.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs flex-shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 leading-tight">{cert.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {cert.issuer} • {cert.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Text Editing Modal */}
      {editingField && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 capitalize">Edit {editingField}</h3>
              <button onClick={() => setEditingField(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <textarea
              rows={5}
              value={tempText}
              onChange={(e) => setTempText(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setEditingField(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Skill Modal */}
      {showSkillModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleAddSkill} className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Add New Skill</h3>
              <button type="button" onClick={() => setShowSkillModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Skill Name</label>
              <input
                type="text"
                required
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder="e.g. Next.js, Docker, Figma"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Proficiency Level</label>
              <select
                value={newSkillLevel}
                onChange={(e) => setNewSkillLevel(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowSkillModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs"
              >
                Add Skill
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add Cert Modal */}
      {showCertModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleAddCert} className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Add Certification</h3>
              <button type="button" onClick={() => setShowCertModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Certification Title</label>
              <input
                type="text"
                required
                value={newCertTitle}
                onChange={(e) => setNewCertTitle(e.target.value)}
                placeholder="e.g. AWS Certified Developer"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Issuing Organization</label>
              <input
                type="text"
                value={newCertIssuer}
                onChange={(e) => setNewCertIssuer(e.target.value)}
                placeholder="e.g. Amazon Web Services"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Year</label>
              <input
                type="text"
                value={newCertDate}
                onChange={(e) => setNewCertDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowCertModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs"
              >
                Add Certification
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
