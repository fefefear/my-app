import { useState } from 'react';

function App() {
  // 'welcome' - выбор роли, 'register' - форма, 'cabinet' - личный кабинет
  const [step, setStep] = useState<'welcome' | 'register' | 'cabinet'>('welcome');
  const [role, setRole] = useState<string | null>(null);
  
  // Состояние для Ученика (вкладки в кабинете)
  const [studentTab, setStudentTab] = useState<'profile' | 'questions'>('profile');

  // --- ОБЩИЕ СТИЛИ ---
  const btnStyle = { padding: '12px 24px', fontSize: '16px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: '#2563eb', color: 'white', fontWeight: 'bold' };
  const cardStyle = { border: '1px solid #e5e7eb', padding: '24px', borderRadius: '12px', marginBottom: '20px', backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' };
  const inputStyle = { width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '6px', border: '1px solid #d1d5db', boxSizing: 'border-box' as const, fontFamily: 'sans-serif' };
  const labelStyle = { display: 'block', marginBottom: '5px', fontWeight: 'bold', fontSize: '14px', color: '#374151' };

  // --- 1. ЭКРАН ВЫБОРА РОЛИ ---
  if (step === 'welcome') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f3f4f6', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: '36px', color: '#1f2937', margin: 0 }}>Открытый урок</h1>
        <p style={{ color: '#6b7280', fontSize: '18px' }}>Выберите вашу роль для регистрации</p>
        <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
          <button onClick={() => { setRole('teacher'); setStep('register'); }} style={{ ...btnStyle, backgroundColor: '#10b981', padding: '15px 30px' }}>Я Учитель</button>
          <button onClick={() => { setRole('specialist'); setStep('register'); }} style={{ ...btnStyle, backgroundColor: '#8b5cf6', padding: '15px 30px' }}>Я Специалист</button>
          <button onClick={() => { setRole('student'); setStep('register'); }} style={{ ...btnStyle, backgroundColor: '#f59e0b', padding: '15px 30px' }}>Я Ученик</button>
        </div>
      </div>
    );
  }

  // --- 2. ЭКРАН РЕГИСТРАЦИИ (АНКЕТА) ---
  if (step === 'register') {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', padding: '40px 20px', fontFamily: 'sans-serif', display: 'flex', justifyContent: 'center' }}>
        <div style={{ ...cardStyle, width: '100%', maxWidth: '500px' }}>
          <button onClick={() => setStep('welcome')} style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer', marginBottom: '20px', padding: 0 }}>← Назад</button>
          
          <h2 style={{ marginTop: 0, marginBottom: '20px' }}>
            Регистрация: {role === 'teacher' ? 'Учитель' : role === 'specialist' ? 'Специалист' : 'Ученик'}
          </h2>

          <form onSubmit={(e) => { e.preventDefault(); setStep('cabinet'); }}>
            {/* Поля для Учителя */}
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

            {/* Поля для Специалиста (Организатора) */}
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

            {/* Поля для Ученика */}
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

            {/* Загрузка документа (для всех) */}
            <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#fef3c7', borderRadius: '8px', border: '1px dashed #f59e0b' }}>
              <label style={{ ...labelStyle, color: '#92400e' }}>📎 Прикрепить документ (подтверждение личности)</label>
              <input type="file" required style={{ fontSize: '14px', marginTop: '5px' }} />
              <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#92400e' }}>Загрузите скан паспорта, справку из школы или диплом.</p>
            </div>

            <button type="submit" style={{ ...btnStyle, width: '100%', marginTop: '25px', backgroundColor: '#10b981' }}>
              Зарегистрироваться
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- 3. ЛИЧНЫЕ КАБИНЕТЫ (После регистрации) ---
  
  // Кабинет Учителя
  if (role === 'teacher') {
    return (
      <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h1>Кабинет Учителя</h1>
          <button onClick={() => { setRole(null); setStep('welcome'); }} style={{ ...btnStyle, backgroundColor: '#ef4444' }}>Выйти</button>
        </div>
        <div style={cardStyle}>
          <p>Здесь будет каталог специалистов, фильтры и кнопка «Пригласить».</p>
        </div>
      </div>
    );
  }

  // Кабинет Специалиста
  if (role === 'specialist') {
    return (
      <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h1>Кабинет Специалиста</h1>
          <button onClick={() => { setRole(null); setStep('welcome'); }} style={{ ...btnStyle, backgroundColor: '#ef4444' }}>Выйти</button>
        </div>
        <div style={cardStyle}>
          <h2>Профиль специалиста</h2>
          <p>Здесь будет анкета с опытом, темами выступлений и календарь доступности.</p>
        </div>
      </div>
    );
  }

  // Кабинет Ученика (Веб-версия с вкладками)
  if (role === 'student') {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', fontFamily: 'sans-serif' }}>
        <header style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '15px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ margin: 0, fontSize: '22px', color: '#1f2937' }}>Личный кабинет ученика</h1>
          <button onClick={() => { setRole(null); setStep('welcome'); }} style={{ ...btnStyle, backgroundColor: '#ef4444', padding: '8px 15px' }}>Выйти</button>
        </header>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '30px 20px', display: 'flex', gap: '30px' }}>
          {/* Сайдбар */}
          <aside style={{ width: '250px', flexShrink: 0 }}>
            <div style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
              <button onClick={() => setStudentTab('profile')} style={{ width: '100%', padding: '15px 20px', textAlign: 'left', border: 'none', backgroundColor: studentTab === 'profile' ? '#eff6ff' : 'transparent', color: studentTab === 'profile' ? '#2563eb' : '#4b5563', fontWeight: 'bold', cursor: 'pointer', borderLeft: studentTab === 'profile' ? '4px solid #2563eb' : '4px solid transparent' }}>
                Мои уроки
              </button>
              <button onClick={() => setStudentTab('questions')} style={{ width: '100%', padding: '15px 20px', textAlign: 'left', border: 'none', backgroundColor: studentTab === 'questions' ? '#eff6ff' : 'transparent', color: studentTab === 'questions' ? '#2563eb' : '#4b5563', fontWeight: 'bold', cursor: 'pointer', borderLeft: studentTab === 'questions' ? '4px solid #2563eb' : '4px solid transparent', borderTop: '1px solid #e5e7eb' }}>
                Мои вопросы
              </button>
            </div>
          </aside>

          {/* Контент */}
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
}

export default App;