import React, { useState } from 'react';
import { User, CreditCard, Lock, Calendar, MapPin, Mail, Globe, Heart, Shield, Edit2, Check, X } from 'lucide-react';
import type { EmployeeProfile } from '../../types/salaryTypes';

interface PrivateInfoTabProps {
  employee: EmployeeProfile | null;
}

export const PrivateInfoTab: React.FC<PrivateInfoTabProps> = ({ employee }) => {
  const [personalDetails, setPersonalDetails] = useState({
    dob: '15 Aug 1996',
    address: '123 Green Glen Layout, Bellandur, Bangalore, Karnataka - 560103',
    nationality: 'Indian',
    personalEmail: employee?.email || 'janani.personal@gmail.com',
    gender: 'Female',
    maritalStatus: 'Single',
    dateOfJoining: employee?.effectiveFrom || '10 Jan 2023',
    emergencyContact: 'Ramesh Devi (Father) • +91 98765 00000',
  });

  const [bankDetails, setBankDetails] = useState({
    accountName: employee?.name || 'Janani Devi',
    accountNumber: '50100234984829',
    bankName: 'HDFC Bank Ltd.',
    ifscCode: 'HDFC0001234',
    panNo: 'ABCDE1234F',
    uanNo: '101234567890',
    empCode: employee?.employeeId || 'EMP-1001',
  });

  const [editing, setEditing] = useState(false);
  const [tempPersonal, setTempPersonal] = useState({ ...personalDetails });
  const [showAccountMask, setShowAccountMask] = useState(true);

  const handleSave = () => {
    setPersonalDetails({ ...tempPersonal });
    setEditing(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* Header section with edit action */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Private Information</h2>
          <p className="text-xs text-slate-500 font-medium">
            Personal records, identity verification, and banking information
          </p>
        </div>

        <button
          onClick={() => {
            if (editing) {
              handleSave();
            } else {
              setTempPersonal({ ...personalDetails });
              setEditing(true);
            }
          }}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer ${
            editing
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
              : 'bg-white border border-slate-200 hover:bg-slate-50 text-slate-700'
          }`}
        >
          {editing ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Save Details</span>
            </>
          ) : (
            <>
              <Edit2 className="w-3.5 h-3.5 text-slate-500" />
              <span>Edit Info</span>
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Personal & Contact Information */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <User className="w-4 h-4 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900">Personal Details</h3>
          </div>

          <div className="space-y-4 text-xs">
            {/* Date of Birth */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-1 border-b border-slate-50">
              <span className="text-slate-400 font-medium flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-slate-400" /> Date of Birth
              </span>
              {editing ? (
                <input
                  type="text"
                  value={tempPersonal.dob}
                  onChange={(e) => setTempPersonal({ ...tempPersonal, dob: e.target.value })}
                  className="px-2 py-1 bg-slate-50 border rounded text-xs text-slate-900 font-semibold"
                />
              ) : (
                <span className="font-semibold text-slate-800">{personalDetails.dob}</span>
              )}
            </div>

            {/* Residing Address */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 py-1 border-b border-slate-50">
              <span className="text-slate-400 font-medium flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> Residing Address
              </span>
              {editing ? (
                <textarea
                  rows={2}
                  value={tempPersonal.address}
                  onChange={(e) => setTempPersonal({ ...tempPersonal, address: e.target.value })}
                  className="px-2 py-1 bg-slate-50 border rounded text-xs text-slate-900 font-semibold max-w-xs"
                />
              ) : (
                <span className="font-semibold text-slate-800 text-right max-w-xs leading-relaxed">
                  {personalDetails.address}
                </span>
              )}
            </div>

            {/* Nationality */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-1 border-b border-slate-50">
              <span className="text-slate-400 font-medium flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-slate-400" /> Nationality
              </span>
              {editing ? (
                <input
                  type="text"
                  value={tempPersonal.nationality}
                  onChange={(e) => setTempPersonal({ ...tempPersonal, nationality: e.target.value })}
                  className="px-2 py-1 bg-slate-50 border rounded text-xs text-slate-900 font-semibold"
                />
              ) : (
                <span className="font-semibold text-slate-800">{personalDetails.nationality}</span>
              )}
            </div>

            {/* Personal Email */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-1 border-b border-slate-50">
              <span className="text-slate-400 font-medium flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-slate-400" /> Personal Email
              </span>
              {editing ? (
                <input
                  type="email"
                  value={tempPersonal.personalEmail}
                  onChange={(e) => setTempPersonal({ ...tempPersonal, personalEmail: e.target.value })}
                  className="px-2 py-1 bg-slate-50 border rounded text-xs text-slate-900 font-semibold"
                />
              ) : (
                <span className="font-semibold text-slate-800">{personalDetails.personalEmail}</span>
              )}
            </div>

            {/* Gender */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-1 border-b border-slate-50">
              <span className="text-slate-400 font-medium flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-slate-400" /> Gender
              </span>
              {editing ? (
                <input
                  type="text"
                  value={tempPersonal.gender}
                  onChange={(e) => setTempPersonal({ ...tempPersonal, gender: e.target.value })}
                  className="px-2 py-1 bg-slate-50 border rounded text-xs text-slate-900 font-semibold"
                />
              ) : (
                <span className="font-semibold text-slate-800">{personalDetails.gender}</span>
              )}
            </div>

            {/* Marital Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-1 border-b border-slate-50">
              <span className="text-slate-400 font-medium flex items-center gap-2">
                <Heart className="w-3.5 h-3.5 text-slate-400" /> Marital Status
              </span>
              {editing ? (
                <input
                  type="text"
                  value={tempPersonal.maritalStatus}
                  onChange={(e) => setTempPersonal({ ...tempPersonal, maritalStatus: e.target.value })}
                  className="px-2 py-1 bg-slate-50 border rounded text-xs text-slate-900 font-semibold"
                />
              ) : (
                <span className="font-semibold text-slate-800">{personalDetails.maritalStatus}</span>
              )}
            </div>

            {/* Date of Joining */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 py-1">
              <span className="text-slate-400 font-medium flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-slate-400" /> Date of Joining
              </span>
              <span className="font-semibold text-slate-800">{personalDetails.dateOfJoining}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Bank Details & Verification Identification */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-600" />
              <h3 className="text-base font-bold text-slate-900">Bank & Legal Details</h3>
            </div>
            <button
              onClick={() => setShowAccountMask(!showAccountMask)}
              className="text-[11px] text-blue-600 font-semibold hover:underline"
            >
              {showAccountMask ? 'Show Numbers' : 'Mask Numbers'}
            </button>
          </div>

          <div className="space-y-4 text-xs">
            {/* Account Holder */}
            <div className="flex items-center justify-between py-1 border-b border-slate-50">
              <span className="text-slate-400 font-medium">Account Name</span>
              <span className="font-bold text-slate-800">{bankDetails.accountName}</span>
            </div>

            {/* Account Number */}
            <div className="flex items-center justify-between py-1 border-b border-slate-50">
              <span className="text-slate-400 font-medium">Account Number</span>
              <span className="font-mono font-bold text-slate-800">
                {showAccountMask ? '•••• •••• 4829' : bankDetails.accountNumber}
              </span>
            </div>

            {/* Bank Name */}
            <div className="flex items-center justify-between py-1 border-b border-slate-50">
              <span className="text-slate-400 font-medium">Bank Name</span>
              <span className="font-semibold text-slate-800">{bankDetails.bankName}</span>
            </div>

            {/* IFSC Code */}
            <div className="flex items-center justify-between py-1 border-b border-slate-50">
              <span className="text-slate-400 font-medium">IFSC Code</span>
              <span className="font-mono font-bold text-slate-800">{bankDetails.ifscCode}</span>
            </div>

            {/* PAN No */}
            <div className="flex items-center justify-between py-1 border-b border-slate-50">
              <span className="text-slate-400 font-medium">PAN Card No</span>
              <span className="font-mono font-bold text-slate-800">
                {showAccountMask ? '•••••1234F' : bankDetails.panNo}
              </span>
            </div>

            {/* UAN No */}
            <div className="flex items-center justify-between py-1 border-b border-slate-50">
              <span className="text-slate-400 font-medium">UAN Number</span>
              <span className="font-mono font-bold text-slate-800">
                {showAccountMask ? '••••••••7890' : bankDetails.uanNo}
              </span>
            </div>

            {/* Emp Code */}
            <div className="flex items-center justify-between py-1">
              <span className="text-slate-400 font-medium">Employee Code</span>
              <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                {bankDetails.empCode}
              </span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-2.5 text-[11px] text-slate-500">
            <Shield className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>Bank and identity details are encrypted and securely stored according to HR regulations.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
