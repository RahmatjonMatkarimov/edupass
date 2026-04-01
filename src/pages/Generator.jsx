import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { handleDownloadPdf, handlePrintPdf } from '../utils/pdfGenerator';
import { 
  IconDownload, IconUpload, IconFileDescription, IconPrinter, 
  IconPlus, IconTrash 
} from '@tabler/icons-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const DEFAULT_DAYS = [
  'Dushanba',
  'Seshanba',
  'Chorshanba',
  'Payshanba',
  'Juma',
  'Shanba'
];

const INITIAL_STUDENT = {
  id: Date.now(),
  docNumber: '1',
  date: new Date().toLocaleDateString(),
  studentClass: '11-A',
  studentName: 'Matkarimov Rahmatjon',
  phoneNumber: '+998 91 999 98 83',
  directorName: 'U.Yusupov',
  photoUrl: null,
  schedule: {
    Dushanba: { center: 'Najot talim', time: '14:00' },
    Seshanba: { center: '', time: '' },
    Chorshanba: { center: 'Najot talim', time: '14:00' },
    Payshanba: { center: '', time: '' },
    Juma: { center: 'Najot talim', time: '14:00' },
    Shanba: { center: '', time: '' },
  }
};

function Generator() {
  const [students, setStudents] = useState([INITIAL_STUDENT]);

  const formatPhone = (val) => {
    // Remove all non-digits except '+'
    let v = val.replace(/[^\d+]/g, '');
    
    // Ensure it starts with +998
    if (!v.startsWith('+998')) {
      v = '+998' + v.replace(/^\+?998?/, '');
    }
    
    // Limit to 13 characters (+998 plus 9 digits)
    v = v.substring(0, 13);
    
    // Format: +998 91 999 98 83
    let res = v.substring(0, 4);
    if (v.length > 4) res += ' ' + v.substring(4, 6);
    if (v.length > 6) res += ' ' + v.substring(6, 9);
    if (v.length > 9) res += ' ' + v.substring(9, 11);
    if (v.length > 11) res += ' ' + v.substring(11, 13);
    
    return res;
  };

  const handleInputChange = (id, e) => {
    let { name, value } = e.target;
    
    if (name === 'phoneNumber') {
      value = formatPhone(value);
    }
    
    setStudents(prev => prev.map(s => s.id === id ? { ...s, [name]: value } : s));
  };

  const handleScheduleChange = (id, day, field, value) => {
    setStudents(prev => prev.map(s => s.id === id ? {
      ...s,
      schedule: {
        ...s.schedule,
        [day]: { ...s.schedule[day], [field]: value }
      }
    } : s));
  };

  const handlePhotoUpload = (id, e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setStudents(prev => prev.map(s => s.id === id ? { ...s, photoUrl: url } : s));
    }
  };

  const addStudent = () => {
    setStudents(prev => [...prev, { ...INITIAL_STUDENT, id: Date.now(), docNumber: (prev.length + 1).toString() }]);
  };

  const removeStudent = (id) => {
    if (students.length > 1) {
      setStudents(prev => prev.filter(s => s.id !== id));
    }
  };

  const downloadPdf = () => {
    handleDownloadPdf('preview-content', `Ruxsatnomalar.pdf`);
  };

  const printPdf = () => {
    handlePrintPdf('preview-content');
  };

  return (
    <div className="generator-page">
      <Helmet>
        <title>EduPass - Ruxsatnoma Generatori</title>
        <meta name="description" content="EduPass orqali o'quvchilar uchun sertifikat yoki tayyorgarlik darslari ruxsatnomasini bir necha soniyada tayyorlang." />
      </Helmet>
      
      <div className="generator-main-layout">
        <div className="generator-toolbar">
          <div className="toolbar-left">
            <Link to="/" className="logo">
              <IconFileDescription size={32} />
              Edu<span>Pass</span>
            </Link>
          </div>
          <div className="toolbar-actions">
            <button className="btn-secondary" onClick={addStudent} aria-label="Yangi o'quvchi qo'shish">
              <IconPlus size={18} />
              <span className="btn-text">Sinfga o'quvchi qo'shish</span>
            </button>
            <div className="action-divider"></div>
            <button className="btn-success" onClick={printPdf} aria-label="Hujjatlarni chop etish">
              <IconPrinter size={18} />
              <span className="btn-text">Chop etish</span>
            </button>
            <button className="btn-primary" onClick={downloadPdf} aria-label="PDF formatida yuklab olish">
              <IconDownload size={18} />
              <span className="btn-text">PDF yuklash</span>
            </button>
          </div>
        </div>

        <main className="generator-content">
          <section className="form-column">
            <div className="column-header">
              <h3>Hujjat ma'lumotlari</h3>
              <span className="student-count">{students.length} ta o'quvchi</span>
            </div>
            {students.map((student, index) => (
              <article key={student.id} className="student-card-modern">
                <div className="student-form-header">
                  <h3>O'quvchi #{index + 1}</h3>
                  {students.length > 1 && (
                    <button 
                      className="btn-icon-danger" 
                      onClick={() => removeStudent(student.id)}
                      aria-label={`O'quvchi #${index + 1} ni o'chirish`}
                    >
                      <IconTrash size={18} aria-hidden="true" />
                    </button>
                  )}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor={`docNumber-${student.id}`}>Hujjat raqami (№)</label>
                    <input 
                      id={`docNumber-${student.id}`}
                      type="text" 
                      className="form-control" 
                      name="docNumber" 
                      value={student.docNumber} 
                      onChange={(e) => handleInputChange(student.id, e)} 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor={`date-${student.id}`}>Sana</label>
                    <input 
                      id={`date-${student.id}`}
                      type="text" 
                      className="form-control" 
                      name="date" 
                      value={student.date} 
                      onChange={(e) => handleInputChange(student.id, e)} 
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor={`class-${student.id}`}>Sinf/Guruh</label>
                    <input 
                      id={`class-${student.id}`}
                      type="text" 
                      className="form-control" 
                      name="studentClass" 
                      value={student.studentClass} 
                      onChange={(e) => handleInputChange(student.id, e)} 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor={`name-${student.id}`}>Ism Familiya</label>
                    <input 
                      id={`name-${student.id}`}
                      type="text" 
                      className="form-control" 
                      name="studentName" 
                      value={student.studentName} 
                      onChange={(e) => handleInputChange(student.id, e)} 
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor={`phone-${student.id}`}>Telefon raqam</label>
                    <input 
                      id={`phone-${student.id}`}
                      type="text" 
                      className="form-control" 
                      name="phoneNumber" 
                      value={student.phoneNumber} 
                      onChange={(e) => handleInputChange(student.id, e)} 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor={`director-${student.id}`}>Maktab direktori</label>
                    <input 
                      id={`director-${student.id}`}
                      type="text" 
                      className="form-control" 
                      name="directorName" 
                      value={student.directorName} 
                      onChange={(e) => handleInputChange(student.id, e)} 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>O'quvchi Rasmi (3x4)</label>
                  <div className="file-upload-wrapper">
                    <label className="file-upload-btn">
                      <IconUpload size={24} aria-hidden="true" />
                      {student.photoUrl ? "RASM YANGILASH..." : "RASM YUKLASH..."}
                      <input 
                        type="file" 
                        className="file-upload-input" 
                        accept="image/*" 
                        onChange={(e) => handlePhotoUpload(student.id, e)} 
                        aria-label="Rasm yuklash"
                      />
                    </label>
                  </div>
                </div>

                <div className="schedule-section">
                  <h4>Dars Jadvali</h4>
                  {DEFAULT_DAYS.map(day => (
                    <div key={day} className="schedule-card">
                      <h5>{day}</h5>
                      <div className="form-row">
                        <div className="form-group mb-0">
                          <label htmlFor={`center-${day}-${student.id}`}>O'quv markazi</label>
                          <input
                            id={`center-${day}-${student.id}`}
                            type="text"
                            className="form-control"
                            value={student.schedule[day].center}
                            onChange={(e) => handleScheduleChange(student.id, day, 'center', e.target.value)}
                          />
                        </div>
                        <div className="form-group mb-0">
                          <label htmlFor={`time-${day}-${student.id}`}>Vaqt</label>
                          <input
                            id={`time-${day}-${student.id}`}
                            type="text"
                            className="form-control"
                            value={student.schedule[day].time}
                            onChange={(e) => handleScheduleChange(student.id, day, 'time', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </section>

          <aside className="preview-column">
            <div className="column-header">
              <h3>Hujjat Ko'rinishi (Preview)</h3>
            </div>
            <div className="preview-shadow-container">
              <div id="preview-content" className="preview-content-list">
                {students.map((student) => (
                  <div key={student.id} className="document-a4">
                    <div className="doc-top-section">
                      <div className="doc-top-left">
                        <span className="bold-label">№</span>
                        <span className="doc-input-line short-line">{student.docNumber}</span>
                        <span className="bold-label ml-30">Sana</span>
                        <span className="doc-input-line long-line">{student.date}</span>
                      </div>

                      <div className="doc-titles">
                        <div className="doc-subtitle">Sertifikat va qo'shimcha tayyorgarlik uchun</div>
                        <div className="doc-main-title">RUXSATNOMA.</div>
                        <div className="doc-class">{student.studentClass}</div>
                      </div>

                      <div className="doc-photo">
                        {student.photoUrl ? (
                          <img src={student.photoUrl} alt={`${student.studentName} rasmi`} />
                        ) : null}
                      </div>
                    </div>

                    <table className="doc-table">
                      <thead>
                        <tr>
                          <th>Hafta kunlari</th>
                          {DEFAULT_DAYS.map(day => <th key={day}>{day}</th>)}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="row-title">O'quv markazi</td>
                          {DEFAULT_DAYS.map(day => <td key={`center-${day}`}>{student.schedule[day].center}</td>)}
                        </tr>
                        <tr>
                          <td className="doc-name-cell">
                            {student.studentName.split(' ').map((word, idx) => (
                              <span key={idx}>
                                <span className="name-text">{word}</span>
                                {idx !== student.studentName.split(' ').length - 1 && ' '}
                              </span>
                            ))}
                          </td>
                          {DEFAULT_DAYS.map(day => <td key={`time-${day}`}>{student.schedule[day].time}</td>)}
                        </tr>
                      </tbody>
                    </table>

                    <div className="doc-phone">
                      {student.phoneNumber}
                    </div>

                    <div className="doc-footer">
                      <div>Maktab direktori:</div>
                      <div>{student.directorName}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </main>
      </div>

      <Footer />
    </div>
  );
}
export default Generator;
