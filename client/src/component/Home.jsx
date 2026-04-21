import React, { useState } from 'react';
import { FaOm } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';



const Home = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      navigate(`/granth?search=${encodeURIComponent(search.trim())}`);
    }
  };

  return (
    <div className="flex flex-col mt-2">
      {/* Banner Image */}
    <div className="flex flex-row w-full">
  <img
    src="/images/bhagwan.jpeg"
    alt="Bhagwan"
    className="w-1/2 h-auto object-contain "
  />
  <img
    src="/images/mandir.jpeg"
    alt="Mandir"
    className="w-1/2 h-auto object-contain "
  />
</div>


      

      <div className="p-4 mt-8">

        <form onSubmit={handleSearch} className="flex justify-center gap-2">
          <input
            type="text"
            placeholder="Search Granth..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md p-2 border border-amber-300 rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition cursor-pointer"
          >
            Search
          </button>
        </form>
      </div>
      {/* Main Content */}
      <div className="flex flex-col md:flex-row mt-4 px-4 gap-4">

        {/* Left Advertisement */}
        <div className="w-full md:w-1/5 bg-gray-100 p-4 rounded shadow text-center">
          <p className="font-semibold">Advertise Here</p>
        </div>

        {/* Center Content */}
        <div className="relative w-full md:w-3/5 p-4 bg-gradient-to-r from-orange-400 to-yellow-300 min-h-screen overflow-hidden rounded shadow">
          {/* Background Om Icon */}
          <FaOm className="absolute text-[120px] md:text-[250px] text-amber-500 opacity-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0" />

          {/* Content */}
          <div className="relative z-10">
            <h1 className="text-2xl md:text-3xl font-bold text-center text-blue-900-800 mb-6">
              दिगंबर जैन धर्म में आपका स्वागत है
            </h1>
            <p className="text-base md:text-lg font-bold text-gray-800 leading-relaxed mb-4">
              दिगंबर जैन धर्म भारत का प्राचीनतम धर्म है, जो अहिंसा, सत्य, अचौर्य, ब्रह्मचर्य और अपरिग्रह के सिद्धांतों पर आधारित है। दिगंबर का अर्थ होता है 'दिशा ही जिनके वस्त्र है।अर्थात् पूरी तरह से सांसारिक वस्त्र और मोह को त्याग कर आत्मा की शुद्धि का मार्ग अपनाना।
            </p>
            <p className="text-base md:text-lg font-bold text-gray-800 leading-relaxed mb-4">
              जैन धर्म का सिद्धांत है कि आत्मा स्वयं में अनंत ज्ञान, अनंत दर्शन, अनंत शक्ति और अनंत सुख का भंडार है। संसार में आत्मा अपने कर्मों के बंधन के कारण बंधी हुई है। जब आत्मा कर्म बंधन से मुक्त हो जाती है, तभी वह मोक्ष को प्राप्त करती है।
            </p>
            <p className="text-base md:text-lg font-bold text-gray-800 leading-relaxed mb-4">
              भगवान महावीर जैन धर्म के २४वें तीर्थंकर माने जाते हैं, जिन्होंने अहिंसा और अपरिग्रह का मार्ग बताया। उन्होंने सभी प्राणियों के प्रति करुणा और दया रखने का उपदेश दिया। दिगंबर संप्रदाय में साधु वस्त्र धारण नहीं करते और पूर्ण तप, त्याग और संयम का पालन करते हैं। वे केवल हाथ से भोजन (अहिंसा पूर्वक) ग्रहण करते हैं और किसी भी प्रकार की सुविधा का उपयोग नहीं करते।
            </p>
            <p className="text-base md:text-lg font-bold text-gray-800 leading-relaxed mb-4">
              जैन धर्म में पंच महाव्रत का पालन अत्यंत आवश्यक माना गया है:<br></br>
              १.अहिंसा<br></br>
              २️. सत्य<br></br>
              ३.अचौर्य <br></br>
              ४.ब्रम्हचर्य<br></br>
              ५.अपरिग्रह<br></br>
            </p>
            <p className="text-base md:text-lg font-bold text-gray-800 leading-relaxed mb-3">
              अहिंसा परमो धर्म की जय !<br></br>
              जिओ और जीने दो !!<br></br>
              ये जैन धर्म के मुख्य सूत्र है ।<br></br>
            </p>
          </div>
        </div>

        {/* Right Advertisement */}
        <div className="w-full md:w-1/5 bg-gray-100 p-4 rounded shadow text-center">
          <p className="font-semibold">Advertise Here</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
