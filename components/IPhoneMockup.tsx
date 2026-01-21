import React from 'react';

interface IPhoneMockupProps {
  children: React.ReactNode;
}

const IPhoneMockup: React.FC<IPhoneMockupProps> = ({ children }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-black p-8">
      {/* iPhone Frame */}
      <div className="relative">
        {/* Outer frame with titanium-like finish */}
        <div className="relative bg-gradient-to-b from-neutral-700 via-neutral-800 to-neutral-900 rounded-[55px] p-[3px] shadow-2xl">
          {/* Inner bezel */}
          <div className="relative bg-black rounded-[52px] p-[10px]">
            {/* Screen container */}
            <div
              className="relative bg-black rounded-[42px] overflow-hidden"
              style={{
                width: '375px',
                height: '812px',
              }}
            >
              {/* Dynamic Island */}
              <div className="absolute top-0 left-0 right-0 z-50 flex justify-center pt-3 pointer-events-none">
                <div className="bg-black w-[126px] h-[37px] rounded-full flex items-center justify-between px-4">
                  {/* Front camera */}
                  <div className="w-[10px] h-[10px] rounded-full bg-[#1a1a2e] ring-1 ring-neutral-800 flex items-center justify-center">
                    <div className="w-[5px] h-[5px] rounded-full bg-[#0f0f23]">
                      <div className="w-[2px] h-[2px] rounded-full bg-blue-400/30 ml-[1px] mt-[1px]" />
                    </div>
                  </div>
                  {/* Spacer */}
                  <div />
                </div>
              </div>

              {/* Screen content */}
              <div className="w-full h-full overflow-hidden rounded-[42px]">
                {children}
              </div>

              {/* Home indicator */}
              <div className="absolute bottom-2 left-0 right-0 flex justify-center pointer-events-none z-50">
                <div className="w-32 h-1 bg-white/30 rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Side buttons - Power */}
        <div className="absolute right-[-3px] top-[140px] w-[3px] h-[80px] bg-gradient-to-r from-neutral-600 to-neutral-700 rounded-r-sm" />

        {/* Side buttons - Volume Up */}
        <div className="absolute left-[-3px] top-[120px] w-[3px] h-[35px] bg-gradient-to-l from-neutral-600 to-neutral-700 rounded-l-sm" />

        {/* Side buttons - Volume Down */}
        <div className="absolute left-[-3px] top-[170px] w-[3px] h-[35px] bg-gradient-to-l from-neutral-600 to-neutral-700 rounded-l-sm" />

        {/* Silent switch */}
        <div className="absolute left-[-3px] top-[80px] w-[3px] h-[20px] bg-gradient-to-l from-neutral-600 to-neutral-700 rounded-l-sm" />
      </div>
    </div>
  );
};

export default IPhoneMockup;
