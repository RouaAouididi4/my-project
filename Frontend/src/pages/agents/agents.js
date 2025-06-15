import "./agents.css";

const agents = [
  {
    name: "Anas Brahem",
    role: "Senior Real Estate Agent",
    experience: "25 years experience",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Maram Aouididi",
    role: "Property Specialist",
    experience: "15 years experience",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Mohammed Chouk",
    role: "Commercial Specialist",
    experience: "10 years experience",
    img: "https://randomuser.me/api/portraits/men/75.jpg",
  },
];

const Agents = () => {
  return (
    <div>
      <h2 className="title text-center mb-5">Meet Our Team</h2>
      <div className="agents-grid">
        {agents.map((agent, index) => (
          <div key={index} className="agent-card">
            <img
              src={agent.img}
              alt={agent.name}
              className="agent-img rounded-circle"
            />
            <h3 className="agent-name">{agent.name}</h3>
            <p className="agent-role">{agent.role}</p>
            <p className="agent-experience">{agent.experience}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Agents;
