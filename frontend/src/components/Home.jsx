import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './Card';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Slider from './Slider';

// https://dropapi-30ujop7pv-hammad-razas-projects.vercel.app/get

const Home = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const api = await axios.get('https://dropapi-30ujop7pv-hammad-razas-projects.vercel.app/get');
      setData(api.data);
    } catch (error) {
      console.error('Error occurred in fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();

  }, []);

  const sliceData = data.slice(0, 8);

  return (
    <>
          <Slider/>
    <div  className="md:grid md:grid-cols-4 grid-cols-1 md:px-2 px-6 md:py-3 py-5 gap-x-4 gap-y-6">
      {sliceData.map((item, id) => (
        <Card key={id} item={item} />
      ))}
    </div>
    </>
  );
};

export default Home;