import "./Header.css";

const header = () => {
  return <span onClick={()=>window.scroll(0,0)} className="header">🎬 Cinema City 🎥</span>;
};

export default header;
