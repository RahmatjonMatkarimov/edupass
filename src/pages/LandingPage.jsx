import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { IconPlus, IconCheck, IconPrinter, IconFileDescription } from '@tabler/icons-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function LandingPage() {
  return (
    <div className="landing-page">
      <Helmet>
        <title>EduPass - Elektron ruxsatnomalar generatori</title>
        <meta name="description" content="EduPass - O'quv markazlari va darslar uchun zamonaviy elektron ruxsatnomalar yaratish xizmati. Vaqtingizni tejang!" />
      </Helmet>
      
      <Navbar />

      <section className="hero">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="badge">RO'YXATDAN O'TISH SHART EMAS</div>
            <h2>
              Ta'lim tizimi uchun 
              <span>zamonaviy EduPass tizimi</span>
            </h2>
            <p>
              O'qituvchilar va sinf rahbarlari uchun o'quvchilarni darsdan tashqari 
              tayyorgarlik darslariga yuborishda rasmiy ruxsatnomalarni bir necha soniyada tayyorlash xizmati.
            </p>
            <div className="hero-btns">
              <Link to="/generator" className="btn-primary btn-lg" style={{ textDecoration: 'none' }}>
                Generatorni boshlash
                <IconCheck size={22} />
              </Link>
              <a href="#about" className="btn-secondary btn-lg" style={{ textDecoration: 'none' }}>Batafsil</a>
            </div>
          </div>
          <div className="hero-image">
            <img src="/hero-image.png" alt="Sertifikat va tayyorgarlik ruxsatnomasi" />
          </div>
        </div>
      </section>

      <section id="about" className="features">
        <div className="section-head">
          <h3>Asosiy vazifalarimiz</h3>
          <p>Sizga hujjatlarni tezkor va xatosiz tayyorlashda ko'maklashamiz.</p>
        </div>
        <div className="feature-grid">
          <div className="feature-item">
            <div className="feature-icon"><IconFileDescription size={30} /></div>
            <h4>Sertifikatlar uchun</h4>
            <p>Tayyorgarlik kurslariga borish uchun maxsus ruxsatnomalar tayyorlash.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon"><IconCheck size={30} /></div>
            <h4>Qo'shimcha darslar</h4>
            <p>Maktabdan tashqari fanlarni o'zlashtirish uchun dars jadvalini shakllantirish.</p>
          </div>
          <div className="feature-item">
            <div className="feature-icon"><IconPrinter size={30} /></div>
            <h4>Rasmiy format</h4>
            <p>Barcha maktab talablariga javob beradigan rasmiy PDF hujjatlarni yuklab olish.</p>
          </div>
        </div>
      </section>

      <section id="faq" className="faq">
        <div className="section-head">
          <h3>Sinf rahbarlari uchun savollar</h3>
        </div>
        <div className="faq-list">
          <div className="faq-item">
            <h5>Xizmat qulaymi?</h5>
            <p>Ha, sinfingizdagi har bir o'quvchi uchun alohida ruxsatnomalarni bir vaqtning o'zida shakllantirish imkoniyati bor.</p>
          </div>
          <div className="faq-item">
            <h5>Barcha ma'lumotlarni o'zim kiritamanmi?</h5>
            <p>Hujjatlarni xatolarsiz tayyorlash uchun kerakli ma'lumotlarni to'liq kiritish tavsiya etiladi.</p>
          </div>
          <div className="faq-item">
            <h5>Ruxsatnomalar necha nusxada chiqadi?</h5>
            <p>Bir betda ikki dona ruxsatnoma joylashadigan qilib tayyorlangan, bu esa qog'ozni tejashda yordam beradi.</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default LandingPage;
