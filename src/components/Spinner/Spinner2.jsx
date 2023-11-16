import React from 'react';
import { TailSpin } from 'react-loader-spinner';

export function Spinner2() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '95vh' }}>
      <h1 className="text-center">El partido aun no ha comenzado</h1>
      <TailSpin
        height={80}
        width={80}
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius={1}
        wrapperStyle={{ justifyContent: 'center', paddingTop: '20px' }}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}
