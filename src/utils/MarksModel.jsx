import { useNavigate } from "react-router-dom";

 
const MarksModal = ({ isOpen, setIsOpen, children }) => {
  if (!isOpen) return null; // Only render modal if it's open

  let navigate  = useNavigate();

  function handleGoBack(){
    navigate(-1)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 relative w-full max-w-md">
        {/* Close button */}
        <button
          onClick={() => {
            setIsOpen(false)
            handleGoBack()
          }}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>
 
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default MarksModal;
