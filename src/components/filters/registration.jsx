import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCheck } from 'react-icons/fa';

const RegistrationModeWise = ({ data }) => {
  const navigate = useNavigate();
  const rguktRegex = /^[nNrRsS]|[rRoO]/i;

  const onlineRgukt = data.filter(user => user.mode === 'online_mode' && rguktRegex.test(user.collegeId));
  const onlineNonRgukt = data.filter(user => user.mode === 'online_mode' && !rguktRegex.test(user.collegeId));
  const offline = data.filter(user => user.mode === 'offline_mode');

  const modes = [
    { mode: 'Online RGUKT', count: onlineRgukt.length, data: onlineRgukt },
    { mode: 'Online Non-RGUKT', count: onlineNonRgukt.length, data: onlineNonRgukt },
    { mode: 'Offline', count: offline.length, data: offline },
  ];

  const handleCardClick = (mode, users) => {
    navigate(`/dashboard/usersdata?view=registrationMode&param=${mode.toLowerCase().replace(' ', '-')}`);
  };

  return (
    <div className="glass-card p-4 rounded-lg shadow-lg">
      <h2 className="text-lg md:text-2xl font-semibold pb-[10px]">Registration Mode Wise</h2>
      
      <div className="online-mode my-4">
        <h3 className="text-lg md:text-xl font-semibold">Online Mode</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div
            className="branch-card m-4 p-4 border rounded-lg shadow-md bg-black text-white flex items-center cursor-pointer"
            onClick={() => handleCardClick('Online RGUKT', onlineRgukt)}
          >
            <div className="icon-container text-white mr-10">
              <FaUserCheck size={32} />
            </div>
            <div className="flex flex-col items-start">
              <p className="text-3xl">{onlineRgukt.length}</p>
              <h3 className="text-lg font-semibold">RGUKT</h3>
            </div>
          </div>
          <div
            className="branch-card m-4 p-4 border rounded-lg shadow-md bg-black text-white flex items-center cursor-pointer"
            onClick={() => handleCardClick('Online Non-RGUKT', onlineNonRgukt)}
          >
            <div className="icon-container text-white mr-10">
              <FaUserCheck size={32} />
            </div>
            <div className="flex flex-col items-start">
              <p className="text-3xl">{onlineNonRgukt.length}</p>
              <h3 className="text-lg font-semibold">Non-RGUKT</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="offline-mode my-4">
        <h3 className="text-lg md:text-xl font-semibold">Offline Mode</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div
            className="branch-card m-4 p-4 border rounded-lg shadow-md bg-black text-white flex items-center cursor-pointer"
            onClick={() => handleCardClick('Offline', offline)}
          >
            <div className="icon-container text-white mr-10">
              <FaUserCheck size={32} />
            </div>
            <div className="flex flex-col items-start">
              <p className="text-3xl">{offline.length}</p>
              <h3 className="text-lg font-semibold">Offline</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationModeWise;
