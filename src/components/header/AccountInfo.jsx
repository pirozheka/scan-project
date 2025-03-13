import React, { useEffect, useState } from 'react';

export function AccountInfo() {
    const [info, setInfo] = useState(null);
  
    useEffect(() => {
      const fetchAccountInfo = async () => {
        try {
          const response = await fetch('https://gateway.scan-interfax.ru/api/v1/account/info', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
            },
          });
          if (!response.ok) {
            throw new Error('Ошибка при получении данных аккаунта');
          }
          const data = await response.json();
          setInfo(data.eventFiltersInfo);
        } catch (error) {
          console.error("Ошибка при получении данных аккаунта:", error);
        }
      };
  
      fetchAccountInfo();
    }, []);
  
    if (!info) return null;
  
    return (
      <div className="flex text-black text-opacity-50 flex-col gap-2 text-xs bg-gray bg-opacity-40 py-5 px-4 rounded-md">
        <p>Использовано компаний: <span className=' text-black font-bold'>{info.usedCompanyCount}</span> </p>
        <p>Лимит по компаниям:<span className=' text-green font-bold'> {info.companyLimit}</span></p>
      </div>
    );
  }