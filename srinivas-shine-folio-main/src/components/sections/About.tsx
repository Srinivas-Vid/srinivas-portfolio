import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { skills, achievements, certifications, education, experience, apprenticeships } from "@/data/portfolio";
import { Award, BookOpen, Trophy, GraduationCap, Briefcase, ExternalLink } from "lucide-react";

// Import tech logos
import pythonLogo from "@/assets/logos/python.png";
import javaLogo from "@/assets/logos/java.png";
import tensorflowLogo from "@/assets/logos/tensorflow.png";
import mysqlLogo from "@/assets/logos/mysql.png";
import sklearnLogo from "@/assets/logos/sklearn.png";
import pandasLogo from "@/assets/logos/pandas.png";
import numpyLogo from "@/assets/logos/numpy.png";
import postgresqlLogo from "@/assets/logos/postgresql.png";
import azureLogo from "@/assets/logos/azure.png";
import gitLogo from "@/assets/logos/git.png";
import powerbiLogo from "@/assets/logos/powerbi.png";
import streamlitLogo from "@/assets/logos/streamlit.png";
import flaskLogo from "@/assets/logos/flask.png";
import matplotlibLogo from "@/assets/logos/matplotlib.png";
import seabornLogo from "@/assets/logos/seaborn.png";
import jupyterLogo from "@/assets/logos/jupyter.png";
import rLogo from "@/assets/logos/r.png";
import cLogo from "@/assets/logos/c.png";
import sqlLogo from "@/assets/logos/sql.png";
import machineLearningLogo from "@/assets/logos/machine-learning.png";

// Logo mapping for technologies
const techLogos: Record<string, string> = {
  "Python": pythonLogo,
  "Java": javaLogo,
  "SQL": sqlLogo,
  "R": rLogo,
  "C": cLogo,
  "Scikit-learn": sklearnLogo,
  "TensorFlow": tensorflowLogo,
  "Pandas": pandasLogo,
  "NumPy": numpyLogo,
  "Machine Learning": machineLearningLogo,
  "MySQL": mysqlLogo,
  "PostgreSQL": postgresqlLogo,
  "Azure": azureLogo,
  "Git": gitLogo,
  "Power BI": powerbiLogo,
  "Streamlit": streamlitLogo,
  "Flask": flaskLogo,
  "Matplotlib": matplotlibLogo,
  "Seaborn": seabornLogo,
  "Jupyter Notebook": jupyterLogo,
};

// Certification logo mapping
import oracleLogo from "@/assets/logos/oracle.png";
import kaggleLogo from "@/assets/logos/kaggle.png";
import hpLogo from "@/assets/logos/hp.png";
import ybiLogo from "@/assets/logos/ybi.png";
import infosysLogo from "@/assets/logos/infosys.png";
import tcsLogo from "@/assets/logos/tcs.png";

const certificationLogos: Record<string, string> = {
  "Oracle": oracleLogo,
  "Kaggle": kaggleLogo,
  "HP Life and HP Foundation": hpLogo,
  "YBI Foundation": ybiLogo,
  "Infosys Springboard": infosysLogo,
  "TCS": tcsLogo,
};

// Education logo mapping

import avanthiLogo from "@/assets/logos/avanthi-institute.png";

const educationLogos: Record<string, string> = {
  "SR Junior College": "/lovable-uploads/2bb7cf11-0b3d-4668-a970-26055ec7d55e.png",
  "Avanthi Institute of Engineering and Technology": "/lovable-uploads/15d4a4b8-a446-4129-a567-267c25f9aeab.png",
};

export function About() {
  return (
    <section id="about" className="py-20 bg-surface">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Passionate about creating innovative solutions and constantly learning new technologies
          </p>
        </div>

        {/* Skills Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12">Technical Skills</h3>
          
          {skills.map((skillCategory) => (
            <div key={skillCategory.category} className="mb-16">
              <h4 className="text-2xl font-semibold mb-8 text-center text-primary">{skillCategory.category}</h4>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                {skillCategory.technologies.map((tech) => (
                  <div key={tech.name} className="flex flex-col items-center text-center group hover:scale-105 transition-all duration-300">
                    <div className="w-20 h-20 mb-4 rounded-lg flex items-center justify-center overflow-hidden bg-white shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      {techLogos[tech.name] ? (
                        <img 
                          src={techLogos[tech.name]} 
                          alt={`${tech.name} logo`}
                          className="w-16 h-16 object-contain"
                        />
                      ) : (
                        <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                          <span className="text-lg font-bold text-primary">
                            {tech.name.substring(0, 2).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                    <h5 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors duration-300">{tech.name}</h5>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Achievements Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12 flex items-center justify-center gap-3">
            <Trophy className="h-8 w-8 text-primary" />
            Achievements
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="card-gradient hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-2">{achievement.title}</h4>
                      <p className="text-muted-foreground mb-3">
                        {achievement.description}
                      </p>
                      <div className="flex gap-2">
                        <Badge variant="secondary">{achievement.date}</Badge>
                        <Badge variant="outline">{achievement.category}</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12">Online Certifications</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {certifications.map((cert, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className="w-32 h-24 bg-white rounded-lg shadow-lg mb-4 flex items-center justify-center overflow-hidden group-hover:shadow-xl transition-shadow duration-300">
                  {certificationLogos[cert.issuer] ? (
                    <img 
                      src={certificationLogos[cert.issuer]} 
                      alt={`${cert.issuer} logo`}
                      className="w-28 h-20 object-contain"
                    />
                  ) : (
                    <div className="w-28 h-20 bg-surface-variant rounded-lg flex items-center justify-center">
                      <span className="text-sm font-bold text-muted-foreground text-center px-2">
                        {cert.issuer}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="text-center">
                  <h4 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors line-clamp-2">
                    {cert.name}
                  </h4>
                  <p className="text-muted-foreground text-xs mb-2">{cert.issuer}</p>
                  <Badge variant="secondary" className="text-xs px-2 py-1 mb-3">{cert.date}</Badge>
                  
                  <div className="flex justify-center">
                    <a 
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:text-primary/80 transition-colors text-xs font-medium"
                    >
                      <ExternalLink className="h-3 w-3" />
                      View
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-4">Education</h3>
          <div className="w-24 h-1 bg-primary mx-auto mb-12"></div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {education.map((edu, index) => (
              <Card key={index} className="card-gradient hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <div className="w-full h-20 bg-white rounded-lg mb-6 flex items-center justify-center shadow-md">
                    {educationLogos[edu.institution] ? (
                      <img 
                        src={educationLogos[edu.institution]} 
                        alt={`${edu.institution} logo`}
                        className="w-full h-16 object-contain px-4"
                      />
                    ) : (
                      <span className="text-lg font-bold text-muted-foreground">
                        {edu.institution.split(' ').slice(0, 2).join(' ')}
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-xl font-bold text-primary">{edu.degree}</h4>
                    <h5 className="text-lg font-semibold">{edu.institution}</h5>
                    <p className="text-muted-foreground font-medium">{edu.duration}</p>
                    
                    {edu.grade && (
                      <div className="pt-2">
                        <Badge variant="secondary" className="text-sm px-3 py-1">
                          {edu.grade}
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Experience Section */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold flex items-center gap-2 mb-8 text-center">
            <Briefcase className="h-6 w-6 text-primary" />
            Internship Experience
          </h3>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <Card key={index} className="card-gradient">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-semibold">{exp.title}</h4>
                      <p className="text-primary font-medium">{exp.company}</p>
                    </div>
                    <Badge variant="outline">{exp.duration}</Badge>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Apprenticeship Section */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold flex items-center gap-2 mb-8 text-center">
            <Award className="h-6 w-6 text-primary" />
            Apprenticeship Programs
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {apprenticeships.map((apprentice, index) => (
              <Card key={index} className="card-gradient">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-lg font-semibold">{apprentice.title}</h4>
                      <p className="text-primary font-medium">{apprentice.organization}</p>
                    </div>
                    <a 
                      href={apprentice.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </div>
                  <Badge variant="secondary" className="mb-4">{apprentice.duration}</Badge>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {apprentice.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}