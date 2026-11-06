import { useState, useEffect } from 'react';

function App() {
  // Используем хэш в URL для навигации (например, #welcome, #register, #cabinet)
  const [step, setStep] = useState<string>(window.location.hash.replace('#', '') || 'welcome');
  const [role, setRole] = useState<string | null>(null);
  const [studentTab, setStudentTab] = useState<'profile' | 'questions'>('profile');

  // Следим за кнопкой "Назад" в браузере
  useEffect(() => {
    const handlePopState = () => {
      const currentHash = window.location.hash.replace('#', '') || 'welcome';
      setStep(currentHash);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Функция для перехода на другой экран
  const navigate = (newStep: string) => {
    window.location.hash = newStep;
    setStep(newStep);
  };

  // --- ОБЩИЕ СТИЛИ ---
  const btnStyle = { padding: '12px 24px', fontSize: '16px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: '#2563eb', color: 'white', fontWeight: 'bold' };
  const cardStyle = { border: '1px solid #e5e7eb', padding: '24px', borderRadius: '12px', marginBottom: '20px', backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' };
  const inputStyle = { width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box' as const, fontFamily: 'sans-serif' };
  const labelStyle = { display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px', color: '#374151' };

  // --- СТРАНИЦА 1: ВЫБОР РОЛИ ---
  if (step === 'welcome' || step === '') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f3f4f6', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: '36px', color: '#1f2937', margin: 0 }}>Открытый урок</h1>
        <p style={{ color: '#6b7280', fontSize: '18px' }}>Выберите вашу роль для регистрации</p>
        <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
          <button onClick={() => { setRole('teacher'); navigate('register'); }} style={{ ...btnStyle, backgroundColor: '#10b981', padding: '15px 30px' }}>Я Учитель</button>
          <button onClick={() => { setRole('specialist'); navigate('register'); }} style={{ ...btnStyle, backgroundColor: '#8b5cf6', padding: '15px 30px' }}>Я Специалист</button>
          <button onClick={() => { setRole('student'); navigate('register'); }} style={{ ...btnStyle, backgroundColor: '#f59e0b', padding: '15px 30px' }}>Я Ученик</button>
        </div>
      </div>
    );
  }

  // --- СТРАНИЦА 2: РЕГИСТРАЦИЯ ---
  if (step === 'register') {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', padding: '40px 20px', fontFamily: 'sans-serif', display: 'flex', justifyContent: 'center' }}>
        <div style={{ ...cardStyle, width: '100%', maxWidth: '500px' }}>
          <button onClick={() => navigate('welcome')} style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', marginBottom: '20px', padding: 0, fontSize: '15px' }}>← Назад</button>
          
          <div style={{ marginBottom: '25px', borderBottom: '1px solid #e5e7eb', paddingBottom: '15px' }}>
            <h2 style={{ margin: 0, fontSize: '24px', color: '#111827' }}>Регистрация</h2>
            <span style={{ display: 'inline-block', marginTop: '8px', backgroundColor: role === 'teacher' ? '#d1fae5' : role === 'specialist' ? '#ede9fe' : '#fef3c7', color: role === 'teacher' ? '#065f46' : role === 'specialist' ? '#5b21b6' : '#92400e', padding: '4px 10px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold' }}>
              {role === 'teacher' ? 'Учитель' : role === 'specialist' ? 'Специалист' : 'Ученик'}
            </span>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); navigate('cabinet'); }}>
            {role === 'teacher' && (
              <>
                <label style={labelStyle}>ФИО</label>
                <input type="text" required style={inputStyle} placeholder="Иванова Мария Петровна" />
                <label style={labelStyle}>Школа</label>
                <input type="text" required style={inputStyle} placeholder="МБОУ СОШ №123" />
                <label style={labelStyle}>Класс (которым руководите)</label>
                <input type="text" required style={inputStyle} placeholder="9А" />
              </>
            )}

            {role === 'specialist' && (
              <>
                <label style={labelStyle}>ФИО</label>
                <input type="text" required style={inputStyle} placeholder="Алексей Смирнов" />
                <label style={labelStyle}>Возраст</label>
                <input type="number" required style={inputStyle} placeholder="30" />
                <label style={labelStyle}>Профессия</label>
                <input type="text" required style={inputStyle} placeholder="Frontend-разработчик" />
                <label style={labelStyle}>Опыт работы</label>
                <input type="text" required style={inputStyle} placeholder="5 лет" />
              </>
            )}

            {role === 'student' && (
              <>
                <label style={labelStyle}>ФИО</label>
                <input type="text" required style={inputStyle} placeholder="Иванов Иван" />
                <label style={labelStyle}>Возраст</label>
                <input type="number" required style={inputStyle} placeholder="15" />
                <label style={labelStyle}>Школа</label>
                <input type="text" required style={inputStyle} placeholder="МБОУ СОШ №123" />
                <label style={labelStyle}>Класс</label>
                <input type="text" required style={inputStyle} placeholder="9А" />
              </>
            )}

            <div style={{ marginTop: '25px', padding: '20px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px dashed #cbd5e1', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', marginBottom: '10px' }}>📄</div>
              <label style={{ display: 'block', fontWeight: 'bold', fontSize: '15px', color: '#334155', marginBottom: '8px' }}>Подтверждение личности</label>
              <p style={{ margin: '0 0 15px 0', fontSize: '13px', color: '#64748b' }}>Прикрепите скан паспорта, справку из школы или диплом</p>
              
              <label style={{ display: 'inline-block', padding: '8px 16px', backgroundColor: '#e2e8f0', color: '#334155', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}>
                Выбрать файл
                <input type="file" required style={{ display: 'none' }} />
              </label>
            </div>

            <button type="submit" style={{ ...btnStyle, width: '100%', marginTop: '25px', backgroundColor: '#10b981' }}>
              Зарегистрироваться
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- СТРАНИЦА 3: КАБИНЕТЫ ---
  if (step === 'cabinet') {
    if (!role) { navigate('welcome'); return null; }

    const handleLogout = () => { setRole(null); navigate('welcome'); };

    if (role === 'teacher') {
      return (
        <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h1>Кабинет Учителя</h1>
            <button onClick={handleLogout} style={{ ...btnStyle, backgroundColor: '#ef4444' }}>Выйти</button>
          </div>
          <div style={cardStyle}><p>Здесь будет каталог специалистов...</p></div>
        </div>
      );
    }

    if (role === 'specialist') {
      return (
        <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h1>Кабинет Специалиста</h1>
            <button onClick={handleLogout} style={{ ...btnStyle, backgroundColor: '#ef4444' }}>Выйти</button>
          </div>
          <div style={cardStyle}><h2>Профиль специалиста</h2></div>
        </div>
      );
    }

    // Ученик
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'sans-serif' }}>
        <header style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '15px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ margin: 0, fontSize: '22px', color: '#1f2937' }}>Личный кабинет ученика</h1>
          <button onClick={handleLogout} style={{ ...btnStyle, backgroundColor: '#ef4444', padding: '8px 15px' }}>Выйти</button>
        </header>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '30px 20px', display: 'flex', gap: '30px' }}>
          <aside style={{ width: '250px', flexShrink: 0 }}>
            <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
              <button onClick={() => setStudentTab('profile')} style={{ width: '100%', padding: '15px 20px', textAlign: 'left', border: 'none', backgroundColor: studentTab === 'profile' ? '#eff6ff' : 'transparent', color: studentTab === 'profile' ? '#2563eb' : '#4b5563', fontWeight: 'bold', cursor: 'pointer', borderLeft: studentTab === 'profile' ? '4px solid #2563eb' : '4px solid transparent' }}>Мои уроки</button>
              <button onClick={() => setStudentTab('questions')} style={{ width: '100%', padding: '15px 20px', textAlign: 'left', border: 'none', backgroundColor: studentTab === 'questions' ? '#eff6ff' : 'transparent', color: studentTab === 'questions' ? '#2563eb' : '#4b5563', fontWeight: 'bold', cursor: 'pointer', borderLeft: studentTab === 'questions' ? '4px solid #2563eb' : '4px solid transparent', borderTop: '1px solid #e5e7eb' }}>Мои вопросы</button>
            </div>
          </aside>

          <main style={{ flex: 1 }}>
            {studentTab === 'profile' && (
              <>
                <div style={cardStyle}>
                  <h2 style={{ margin: '0 0 20px 0', fontSize: '20px' }}>Данные профиля</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', color: '#374151' }}>
                    <p><b>ФИО:</b> Иванов Иван</p>
                    <p><b>Школа:</b> Школа №123</p>
                    <p><b>Класс:</b> 9А</p>
                  </div>
                </div>
                <div style={cardStyle}>
                  <h2 style={{ margin: '0 0 20px 0', fontSize: '20px' }}>Мои уроки</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div style={{ padding: '20px', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                        <b>Как стать программистом</b>
                        <span style={{ color: '#2563eb', fontWeight: 'bold' }}>20 мая, 15:00</span>
                      </div>
                      <div style={{ color: '#4b5563', fontSize: '14px' }}>Специалист: Алексей (Frontend)</div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {studentTab === 'questions' && (
              <div style={cardStyle}>
                <h2 style={{ margin: '0 0 10px 0', fontSize: '20px' }}>Задать вопрос</h2>
                <textarea placeholder="Ваш вопрос..." style={{ width: '100%', minHeight: '100px', padding: '15px', borderRadius: '8px', border: '1px solid #d1d5db', marginBottom: '15px', fontFamily: 'sans-serif', resize: 'vertical', boxSizing: 'border-box', fontSize: '16px' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <input type="checkbox" id="anon" defaultChecked style={{ width: '18px', height: '18px' }} />
                    <label htmlFor="anon" style={{ fontSize: '15px', color: '#374151' }}>Отправить анонимно</label>
                  </div>
                  <button style={{ ...btnStyle, backgroundColor: '#f59e0b', padding: '12px 30px' }}>Отправить</button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    );
  }

  return null;
}

export default App;