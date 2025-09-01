import React, { useState, useEffect } from 'react';

export const RequirementsDetail = ({requirements}) => {
    
    console.log(requirements.PC)
    return (
        <>
           <div className="mt-10 pb-10">
      <h3 className="text-xl font-bold text-[#4ECDC4] uppercase border-b border-gray-600 pb-2 mb-4">
        System Requirements
      </h3>

      {/* Render PC jika ada */}
      {requirements.PC && (
        <>
          <h3 className="text-x font-bold text-[#4ECDC4] uppercase pb-1 mb-4">
            For PC
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Minimum */}
            <div>
              <h5 className="font-medium uppercase mb-3">Minimum :</h5>
              <ul className="space-y-2 text-gray-300 list-disc list-inside marker:text-[#4ECDC4]">
                <li>Prosesor 64-bit dan OS diperlukan</li>
                <li>OS: {requirements.PC.minReq?.os || "-"}</li>
                <li>Prosesor: {requirements.PC.minReq?.processor || "-"}</li>
                <li>Memori: {requirements.PC.minReq?.memory || "-"}</li>
                <li>Grafis: {requirements.PC.minReq?.graphics || "-"}</li>
                <li>DirectX: {requirements.PC.minReq?.directx || "-"}</li>
                <li>Penyimpanan: {requirements.PC.minReq?.storage || "-"}</li>
              </ul>
            </div>

            {/* Recommended */}
            <div>
              <h5 className="font-medium uppercase mb-3">Direkomendasikan :</h5>
              <ul className="space-y-2 text-gray-300 list-disc list-inside marker:text-[#4ECDC4]">
                <li>Prosesor 64-bit dan OS diperlukan</li>
                <li>OS: {requirements.PC.recReq?.os || "-"}</li>
                <li>Prosesor: {requirements.PC.recReq?.processor || "-"}</li>
                <li>Memori: {requirements.PC.recReq?.memory || "-"}</li>
                <li>Grafis: {requirements.PC.recReq?.graphics || "-"}</li>
                <li>DirectX: {requirements.PC.recReq?.directx || "-"}</li>
                <li>Penyimpanan: {requirements.PC.recReq?.storage || "-"}</li>
              </ul>
            </div>
          </div>
        </>
      )}

      {/* Render Mobile jika ada */}
      {requirements.Mobile && (
        <>
          <h3 className="text-x font-bold text-[#4ECDC4] uppercase pb-1 mt-6 mb-4">
            For Mobile
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h5 className=" font-medium uppercase mb-3">Requirements :</h5>
              <ul className="space-y-2 text-gray-300 list-disc list-inside marker:text-[#4ECDC4]">
                <li>OS: {requirements.Mobile.requirements?.os || "-"}</li>
                <li>Memory: {requirements.Mobile.requirements?.memory || "-"}</li>
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
        </>
    )
}