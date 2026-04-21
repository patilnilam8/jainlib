import { Mail, Phone } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-orange-400 to-yellow-400 flex flex-col items-center justify-center p-6">
      <h1 className="text-white text-3xl md:text-4xl font-bold mb-8 bg-orange-600 px-6 py-2 rounded-full shadow-md">संपर्क</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* दीपक शाह */}
        <div className="bg-orange-600 text-white rounded-xl p-6 w-full md:w-72 shadow-lg text-center">
          <h2 className="text-xl font-bold mb-3">दीपक शाह</h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Phone className="w-4 h-4" />
            <span>+91 9422023571</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Mail className="w-4 h-4" />
            <span>deepak@mpc2.com</span>
          </div>
        </div>

        {/* महावीर शाह */}
        <div className="bg-orange-600 text-white rounded-xl p-6 w-72 shadow-lg text-center">
          <h2 className="text-xl font-bold mb-3">महावीर शाह</h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Phone className="w-4 h-4" />
            <span>+91 9422023574</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Mail className="w-4 h-4" />
            <span>mahavir@mpc2.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
