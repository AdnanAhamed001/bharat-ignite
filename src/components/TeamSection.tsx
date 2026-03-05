import { motion } from "framer-motion";
import { useState } from "react";
import { Linkedin } from "lucide-react";

import ebaadImg from "@/assets/team/ebaad-momin.webp";
import mohinImg from "@/assets/team/mohin-shaikh.webp";
import salmanImg from "@/assets/team/salman-mohammed.webp";
import yunusImg from "@/assets/team/mohamed-yunus.webp";
import tariqImg from "@/assets/team/tariq-syed.webp";
import tabishImg from "@/assets/team/tabish-sangrar.webp";
import rajaImg from "@/assets/team/raja-singh.webp";

const team = [
  { name: "Dr. Ebaad Momin", image: ebaadImg, linkedin: "https://www.linkedin.com/in/ebaad-momin-a8435324/" },
  { name: "Mohammed Mohin Shaikh", image: mohinImg, linkedin: "https://www.linkedin.com/in/mahammed-mohin-98306311/" },
  { name: "Salman Mohammed", image: salmanImg, linkedin: "https://www.linkedin.com/in/salman-mohammed-b05a497/" },
  { name: "Mohamed Yunus, CA", image: yunusImg, linkedin: "https://www.linkedin.com/in/mohamed-yunus-55571195" },
  { name: "Tariq Syed", image: tariqImg, linkedin: "https://www.linkedin.com/in/tariqahmedsyed/" },
  { name: "Tabish Sangrar", image: tabishImg, linkedin: "https://www.linkedin.com/in/tabish-sangrar/" },
  { name: "Raja Singh", image: rajaImg, linkedin: "https://www.linkedin.com/in/rsbhurji/" },
];

const mentors = [
  { name: "Anand Vijay Jha", linkedin: "https://www.linkedin.com/in/anandvijayjha/" },
  { name: "Anshu Aanand", linkedin: "https://www.linkedin.com/in/anshuaanandofficial/" },
  { name: "Arijit Bhattacharyya", linkedin: "https://www.linkedin.com/in/arijitbhattacharyya/" },
  { name: "Dr. Harvinder Popli", linkedin: "https://www.linkedin.com/in/harvinder-popli-6ab9b115/" },
  { name: "Florian Oberhofer", linkedin: "https://www.linkedin.com/in/flooberhofer/" },
  { name: "Rahul Anand", linkedin: "https://www.linkedin.com/in/rahul-anand-66835b1/" },
  { name: "Qais Mujeeb", linkedin: "https://www.linkedin.com/in/moqaism/" },
  { name: "Shivam Ahuja", linkedin: "https://www.linkedin.com/in/ahujashivam/" },
  { name: "Hemant Mishra", linkedin: "https://www.linkedin.com/in/hemant-mishra-vc/" },
  { name: "Malini Parmar", linkedin: "https://www.linkedin.com/in/maliniparmar/" },
];

const TeamSection = () => {
  const [activeTab, setActiveTab] = useState<"team" | "mentors">("team");

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      {/* Vertical side text */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/3 hidden lg:block">
        <span className="text-[120px] font-heading font-black text-muted/50 uppercase tracking-widest transform -rotate-90 whitespace-nowrap select-none">
          {activeTab === "team" ? "FOUNDER" : "MENTOR"}
        </span>
      </div>

      <div className="container-wide relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="font-heading font-bold text-2xl lg:text-3xl text-foreground">
            MEET THE <span className="text-secondary">TEAM</span>
          </h2>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-10">
          {(["team", "mentors"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-full font-heading font-semibold text-sm transition-all ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {tab === "team" ? "Team" : "Mentors"}
            </button>
          ))}
        </div>

        {/* Team Grid */}
        {activeTab === "team" && (
          <motion.div
            key="team"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group relative rounded-xl overflow-hidden bg-card border border-border card-hover"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-heading font-semibold text-sm text-foreground">{member.name}</h3>
                </div>
                {/* LinkedIn overlay */}
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-secondary flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Linkedin className="h-4 w-4 text-secondary-foreground" />
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Mentors Grid */}
        {activeTab === "mentors" && (
          <motion.div
            key="mentors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
          >
            {mentors.map((mentor, i) => (
              <motion.div
                key={mentor.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group p-4 rounded-xl bg-card border border-border card-hover text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto mb-3 flex items-center justify-center">
                  <span className="font-heading font-bold text-lg text-primary">
                    {mentor.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-xs text-foreground">{mentor.name}</h3>
                <a
                  href={mentor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex mt-2 text-secondary hover:opacity-80"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TeamSection;
