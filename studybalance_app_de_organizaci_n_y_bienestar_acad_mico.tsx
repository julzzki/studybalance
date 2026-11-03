import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Calendar, 
  CheckSquare, 
  Heart, 
  Clock, 
  Plus, 
  Trash2, 
  CheckCircle, 
  Circle, 
  Play, 
  Pause, 
  RotateCcw, 
  Award, 
  Sun, 
  BookOpen, 
  Briefcase, 
  User, 
  Bell, 
  ChevronRight,
  Droplet,
  Smile,
  Sparkles,
  Filter,
  BarChart2
} from 'lucide-react';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState('home');

  // Tasks State (Persisted in LocalStorage if available)
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('studybalance_tasks');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: 1, title: 'Entrega Final de Proyecto Tecnologías', date: '2026-11-05', time: '23:59', priority: 'Alta', category: 'Estudio', completed: false },
      { id: 2, title: 'Reunión de Avance Trabajo de Investigación', date: '2026-11-04', time: '16:00', priority: 'Media', category: 'Estudio', completed: false },
      { id: 3, title: 'Turno de Trabajo en la Tarde', date: '2026-11-04', time: '18:00', priority: 'Alta', category: 'Trabajo', completed: true },
      { id: 4, title: 'Rutina de Ejercicio o Caminata', date: '2026-11-04', time: '07:00', priority: 'Baja', category: 'Personal', completed: false }
    ];
  });

  // Calendar Events State
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('studybalance_events');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      { id: 101, title: 'Examen Parcial de Algoritmos', type: 'Examen', date: '2026-11-06', time: '09:00', location: 'Aula 402' },
      { id: 102, title: 'Clase de Economía Digital', type: 'Clase', date: '2026-11-04', time: '10:30', location: 'Lab 2' },
      { id: 103, title: 'Entrega Informe Final', type: 'Entrega', date: '2026-11-08', time: '18:00', location: 'Virtual' }
    ];
  });

  // Water Counter State
  const [waterGlasses, setWaterGlasses] = useState(() => {
    const saved = localStorage.getItem('studybalance_water');
    return saved ? parseInt(saved, 10) : 4;
  });

  // Save to LocalStorage effects
  useEffect(() => {
    localStorage.setItem('studybalance_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('studybalance_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('studybalance_water', waterGlasses.toString());
  }, [waterGlasses]);

  // Pomodoro State
  const [pomoMinutes, setPomoMinutes] = useState(25);
  const [pomoSeconds, setPomoSeconds] = useState(0);
  const [pomoIsActive, setPomoIsActive] = useState(false);
  const [pomoMode, setPomoMode] = useState('work'); // 'work' or 'break'

  useEffect(() => {
    let interval = null;
    if (pomoIsActive) {
      interval = setInterval(() => {
        if (pomoSeconds > 0) {
          setPomoSeconds(pomoSeconds - 1);
        } else if (pomoMinutes > 0) {
          setPomoMinutes(pomoMinutes - 1);
          setPomoSeconds(59);
        } else {
          // Switch modes when timer reaches 0
          if (pomoMode === 'work') {
            setPomoMode('break');
            setPomoMinutes(5);
            alert('¡Tiempo de estudio completado! Toma un descanso activo de 5 minutos.');
          } else {
            setPomoMode('work');
            setPomoMinutes(25);
            alert('¡Descanso terminado! Es hora de volver a enfocarte.');
          }
          setPomoIsActive(false);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [pomoIsActive, pomoMinutes, pomoSeconds, pomoMode]);

  const togglePomodoro = () => setPomoIsActive(!pomoIsActive);
  const resetPomodoro = () => {
    setPomoIsActive(false);
    setPomoMinutes(pomoMode === 'work' ? 25 : 5);
    setPomoSeconds(0);
  };

  // Breathing Guide State
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState('Inhala (4s)');
  useEffect(() => {
    let breathTimer;
    if (isBreathing) {
      const phases = [
        { text: 'Inhala profundamente (4s)', duration: 4000 },
        { text: 'Mantén el aire (4s)', duration: 4000 },
        { text: 'Exhala despacio (4s)', duration: 4000 },
        { text: 'Pausa (4s)', duration: 4000 }
      ];
      let currentIdx = 0;
      setBreathPhase(phases[0].text);

      breathTimer = setInterval(() => {
        currentIdx = (currentIdx + 1) % phases.length;
        setBreathPhase(phases[currentIdx].text);
      }, 4000);
    }
    return () => clearInterval(breathTimer);
  }, [isBreathing]);

  // Modals / Input Forms
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', date: '', time: '12:00', priority: 'Media', category: 'Estudio' });

  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', type: 'Clase', date: '', time: '09:00', location: '' });

  // Task Handlers
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.title) return;
    const taskObj = {
      id: Date.now(),
      ...newTask,
      completed: false
    };
    setTasks([...tasks, taskObj]);
    setNewTask({ title: '', date: '', time: '12:00', priority: 'Media', category: 'Estudio' });
    setShowAddTaskModal(false);
  };

  const toggleTaskComplete = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  // Event Handlers
  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!newEvent.title || !newEvent.date) return;
    setEvents([...events, { id: Date.now(), ...newEvent }]);
    setNewEvent({ title: '', type: 'Clase', date: '', time: '09:00', location: '' });
    setShowAddEventModal(false);
  };

  const deleteEvent = (id) => {
    setEvents(events.filter(e => e.id !== id));
  };

  // Filtering states
  const [taskFilterCategory, setTaskFilterCategory] = useState('Todas');
  const [taskFilterPriority, setTaskFilterPriority] = useState('Todas');
  const [eventFilterType, setEventFilterType] = useState('Todos');

  // Filtered Tasks
  const filteredTasks = tasks.filter(task => {
    const matchCat = taskFilterCategory === 'Todas' || task.category === taskFilterCategory;
    const matchPrio = taskFilterPriority === 'Todas' || task.priority === taskFilterPriority;
    return matchCat && matchPrio;
  });

  // Filtered Events
  const filteredEvents = events.filter(ev => {
    return eventFilterType === 'Todos' || ev.type === eventFilterType;
  });

  // Completed percentage calculation
  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col md:flex-row max-w-7xl mx-auto shadow-2xl overflow-hidden rounded-none md:rounded-2xl md:my-4 border border-slate-200">
      
      {/* SIDEBAR FOR DESKTOP / TABLET */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white p-6 justify-between border-r border-slate-800">
        <div>
          {/* Logo Brand */}
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-gradient-to-tr from-indigo-500 to-teal-400 p-2.5 rounded-xl shadow-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-indigo-400 to-teal-300 bg-clip-text text-transparent">
                StudyBalance
              </h1>
              <p className="text-xs text-slate-400 font-medium">Equilibrio & Rendimiento</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab('home')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'home' 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Home className="w-5 h-5" /> Inicio
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'calendar' 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Calendar className="w-5 h-5" /> Calendario
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'tasks' 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <CheckSquare className="w-5 h-5" /> Tareas
            </button>
            <button
              onClick={() => setActiveTab('wellness')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'wellness' 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Heart className="w-5 h-5" /> Bienestar
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'schedule' 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Clock className="w-5 h-5" /> Horarios & Balance
            </button>
          </nav>
        </div>

        {/* User Mini Profile */}
        <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/50 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-500/20 border border-indigo-400 flex items-center justify-center font-bold text-indigo-300">
            AU
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-semibold text-white truncate">Alexander U.</p>
            <p className="text-xs text-slate-400 truncate">Estudiante Universitario</p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col min-h-screen md:min-h-0 bg-slate-50 pb-20 md:pb-6 overflow-y-auto">
        
        {/* TOP BAR MOBILE */}
        <header className="md:hidden bg-slate-900 text-white p-4 flex items-center justify-between sticky top-0 z-30 shadow-md">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-indigo-300 to-teal-300 bg-clip-text text-transparent">
              StudyBalance
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-xs">
              AU
            </div>
          </div>
        </header>

        {/* DYNAMIC CONTENT SWITCHER */}
        <div className="p-4 md:p-8 flex-1">
          
          {/* ================= PANTALLA 1: INICIO ================= */}
          {activeTab === 'home' && (
            <div className="space-y-6">
              {/* Header Greeting */}
              <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-teal-600 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-12 -mt-12 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-teal-100 flex items-center gap-1">
                      <Sun className="w-3.5 h-3.5" /> Hola, Alexander
                    </span>
                    <span className="text-xs text-indigo-100 font-medium">
                      {new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-extrabold mt-1">¡Mantén el equilibrio hoy!</h2>
                  <p className="text-indigo-100 text-sm mt-1 max-w-lg">
                    Tienes <span className="font-bold text-white">{tasks.filter(t => !t.completed).length} tareas pendientes</span> y 
                    <span className="font-bold text-white"> {events.length} eventos</span> programados en tu calendario.
                  </p>

                  {/* Quick Daily Progress */}
                  <div className="mt-6 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-white">Progreso Diario de Tareas</span>
                      <span className="text-xs font-bold text-teal-200">{progressPercent}% completado</span>
                    </div>
                    <div className="w-full bg-black/20 rounded-full h-2.5 overflow-hidden">
                      <div 
                        className="bg-teal-300 h-2.5 rounded-full transition-all duration-500 shadow-sm" 
                        style={{ width: `${progressPercent}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid 2 Columns */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Pending High Priority Tasks */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                      <CheckSquare className="w-5 h-5 text-indigo-600" /> Tareas Prioritarias
                    </h3>
                    <button 
                      onClick={() => setActiveTab('tasks')} 
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                    >
                      Ver todas <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {tasks.filter(t => !t.completed).slice(0, 4).map(task => (
                      <div 
                        key={task.id} 
                        className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => toggleTaskComplete(task.id)}
                            className="text-slate-300 hover:text-indigo-600 transition-colors"
                          >
                            <Circle className="w-6 h-6" />
                          </button>
                          <div>
                            <h4 className="font-semibold text-slate-800 text-sm leading-tight">{task.title}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                                task.priority === 'Alta' ? 'bg-red-100 text-red-700' :
                                task.priority === 'Media' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                              }`}>
                                {task.priority}
                              </span>
                              <span className="text-xs text-slate-400 flex items-center gap-1">
                                <Clock className="w-3 h-3" /> {task.date} ({task.time})
                              </span>
                            </div>
                          </div>
                        </div>

                        <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600">
                          {task.category}
                        </span>
                      </div>
                    ))}

                    {tasks.filter(t => !t.completed).length === 0 && (
                      <div className="bg-white p-8 rounded-2xl border border-dashed border-slate-300 text-center">
                        <Smile className="w-10 h-10 text-teal-500 mx-auto mb-2" />
                        <p className="font-medium text-slate-600 text-sm">¡Excelente! No tienes tareas pendientes urgentes.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Upcoming Exams & Events Widget */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                      <Bell className="w-5 h-5 text-teal-600" /> Próximas Evaluaciones
                    </h3>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                    {events.slice(0, 3).map(ev => (
                      <div key={ev.id} className="border-b border-slate-100 pb-3 last:border-0 last:pb-0 flex items-start gap-3">
                        <div className={`p-2.5 rounded-xl font-bold text-xs text-center min-w-[52px] ${
                          ev.type === 'Examen' ? 'bg-red-50 text-red-600 border border-red-100' :
                          ev.type === 'Entrega' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
                          'bg-indigo-50 text-indigo-600 border border-indigo-100'
                        }`}>
                          <div className="uppercase text-[9px] text-slate-400">{ev.type}</div>
                          <div className="text-sm font-extrabold mt-0.5">{ev.date.split('-')[2]}</div>
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-800 text-sm">{ev.title}</h4>
                          <p className="text-xs text-slate-500 mt-0.5">{ev.time} • {ev.location}</p>
                        </div>
                      </div>
                    ))}

                    <button 
                      onClick={() => setActiveTab('calendar')}
                      className="w-full py-2.5 bg-slate-50 hover:bg-slate-100 text-indigo-600 font-semibold text-xs rounded-xl transition-colors text-center block"
                    >
                      Ver Calendario Académico Completo
                    </button>
                  </div>

                  {/* Fast Pomodoro Banner */}
                  <div className="bg-gradient-to-br from-purple-900 to-indigo-900 text-white p-5 rounded-2xl shadow-md">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-purple-300">Pausa Rápida</span>
                      <Heart className="w-4 h-4 text-pink-400" />
                    </div>
                    <p className="text-xs text-purple-200 mb-3">¿Te sientes cansado? Haz una breve pausa guiada para liberar el estrés.</p>
                    <button 
                      onClick={() => setActiveTab('wellness')}
                      className="w-full py-2 bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs rounded-xl transition-colors shadow-sm"
                    >
                      Ir a Bienestar Personal
                    </button>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* ================= PANTALLA 2: CALENDARIO ACADÉMICO ================= */}
          {activeTab === 'calendar' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900">Calendario Académico</h2>
                  <p className="text-sm text-slate-500">Visualiza y programa tus clases, exámenes y fechas límite</p>
                </div>
                <button
                  onClick={() => setShowAddEventModal(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Plus className="w-4 h-4" /> Agregar Evento
                </button>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" /> Filtrar:
                </span>
                {['Todos', 'Clase', 'Examen', 'Entrega'].map(type => (
                  <button
                    key={type}
                    onClick={() => setEventFilterType(type)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      eventFilterType === type 
                        ? 'bg-slate-900 text-white shadow' 
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Grid of Calendar Items */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredEvents.map(ev => (
                  <div key={ev.id} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm relative group hover:shadow-md transition-all">
                    <div className="flex items-start justify-between">
                      <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wider ${
                        ev.type === 'Examen' ? 'bg-red-100 text-red-700' :
                        ev.type === 'Entrega' ? 'bg-amber-100 text-amber-700' : 'bg-indigo-100 text-indigo-700'
                      }`}>
                        {ev.type}
                      </span>
                      <button 
                        onClick={() => deleteEvent(ev.id)}
                        className="text-slate-300 hover:text-red-500 transition-colors p-1"
                        title="Eliminar evento"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <h3 className="font-bold text-slate-800 text-base mt-3">{ev.title}</h3>
                    
                    <div className="mt-4 space-y-1 text-xs text-slate-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        <span>Fecha: <strong className="text-slate-700">{ev.date}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span>Hora: <strong className="text-slate-700">{ev.time}</strong></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-slate-400" />
                        <span>Lugar / Plataforma: <strong className="text-slate-700">{ev.location || 'No especificado'}</strong></span>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredEvents.length === 0 && (
                  <div className="col-span-full bg-white p-12 rounded-2xl border border-dashed border-slate-300 text-center">
                    <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-600 font-semibold">No se encontraron eventos o actividades académicas.</p>
                    <p className="text-slate-400 text-xs mt-1">Intenta cambiar los filtros o agrega un nuevo examen/clase.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================= PANTALLA 3: LISTA DE TAREAS ================= */}
          {activeTab === 'tasks' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900">Lista de Tareas</h2>
                  <p className="text-sm text-slate-500">Organiza tus deberes según prioridad y categoría</p>
                </div>
                <button
                  onClick={() => setShowAddTaskModal(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Plus className="w-4 h-4" /> Agregar Tarea
                </button>
              </div>

              {/* Filters Bar */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-wrap items-center justify-between gap-4">
                {/* Category Filter */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Categoría:</span>
                  {['Todas', 'Estudio', 'Trabajo', 'Personal'].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setTaskFilterCategory(cat)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        taskFilterCategory === cat 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Priority Filter */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Prioridad:</span>
                  {['Todas', 'Alta', 'Media', 'Baja'].map(prio => (
                    <button
                      key={prio}
                      onClick={() => setTaskFilterPriority(prio)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        taskFilterPriority === prio 
                          ? 'bg-slate-900 text-white' 
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {prio}
                    </button>
                  ))}
                </div>
              </div>

              {/* Task Items List */}
              <div className="space-y-3">
                {filteredTasks.map(task => (
                  <div 
                    key={task.id} 
                    className={`bg-white p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                      task.completed ? 'opacity-60 bg-slate-50 border-slate-200' : 'border-slate-200 shadow-sm hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-3.5 flex-1 min-w-0">
                      <button 
                        onClick={() => toggleTaskComplete(task.id)}
                        className={`transition-colors ${task.completed ? 'text-teal-600' : 'text-slate-300 hover:text-indigo-600'}`}
                      >
                        {task.completed ? <CheckCircle className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                      </button>
                      <div className="min-w-0 flex-1">
                        <h4 className={`font-semibold text-slate-800 text-sm leading-tight truncate ${task.completed ? 'line-through text-slate-400' : ''}`}>
                          {task.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase ${
                            task.priority === 'Alta' ? 'bg-red-100 text-red-700' :
                            task.priority === 'Media' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                          }`}>
                            {task.priority}
                          </span>
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {task.date} ({task.time})
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 hidden sm:inline-block">
                        {task.category}
                      </span>
                      <button 
                        onClick={() => deleteTask(task.id)}
                        className="text-slate-300 hover:text-red-500 transition-colors p-1.5"
                        title="Eliminar tarea"
                      >
                        <Trash2 className="w-4.5 h-4.5" />
                      </button>
                    </div>
                  </div>
                ))}

                {filteredTasks.length === 0 && (
                  <div className="bg-white p-10 rounded-2xl border border-dashed border-slate-300 text-center">
                    <CheckSquare className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                    <p className="text-slate-600 font-medium text-sm">No hay tareas que coincidan con los filtros seleccionados.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================= PANTALLA 4: BIENESTAR PERSONAL ================= */}
          {activeTab === 'wellness' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">Bienestar & Manejo de Estrés</h2>
                <p className="text-sm text-slate-500">Pausas activas, hidratación y ejercicios de respiración para prevenir el agobio</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Timer Pomodoro */}
                <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 text-white p-6 rounded-3xl shadow-xl flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="bg-indigo-500/30 text-indigo-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-indigo-400/30">
                        {pomoMode === 'work' ? 'Bloque de Estudio' : 'Descanso Activo'}
                      </span>
                      <Sparkles className="w-5 h-5 text-teal-300" />
                    </div>
                    <h3 className="text-lg font-bold">Temporizador de Enfoque (Pomodoro)</h3>
                    <p className="text-xs text-indigo-200 mt-1">Estudia 25 minutos seguidos y descansa 5 minutos para mantener tu cerebro fresco.</p>
                  </div>

                  {/* Clock Display */}
                  <div className="my-8 text-center">
                    <span className="text-6xl font-extrabold tracking-tight font-mono text-teal-300">
                      {String(pomoMinutes).padStart(2, '0')}:{String(pomoSeconds).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Timer Controls */}
                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={togglePomodoro}
                      className={`px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 shadow-lg transition-all ${
                        pomoIsActive 
                          ? 'bg-amber-500 hover:bg-amber-600 text-white' 
                          : 'bg-teal-400 hover:bg-teal-300 text-slate-900'
                      }`}
                    >
                      {pomoIsActive ? <><Pause className="w-4 h-4" /> Pausar</> : <><Play className="w-4 h-4" /> Iniciar</>}
                    </button>
                    <button
                      onClick={resetPomodoro}
                      className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-2xl transition-all"
                      title="Reiniciar"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Breathing Exercise */}
                <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-teal-600 font-bold text-xs uppercase tracking-wider mb-2">
                      <Heart className="w-4 h-4" /> Relajación Guiada
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Ejercicio de Respiración 4x4</h3>
                    <p className="text-xs text-slate-500 mt-1">Reduce el cortisol y la ansiedad antes de responder tus exámenes o iniciar trabajos largos.</p>
                  </div>

                  <div className="my-6 text-center py-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className={`w-20 h-20 mx-auto rounded-full bg-teal-100 flex items-center justify-center border-4 border-teal-400 transition-all duration-1000 ${isBreathing ? 'scale-110 shadow-lg shadow-teal-200' : 'scale-100'}`}>
                      <Heart className="w-8 h-8 text-teal-600" />
                    </div>
                    <p className="mt-4 font-bold text-slate-800 text-sm">{isBreathing ? breathPhase : 'Presiona para iniciar la sesión'}</p>
                  </div>

                  <button
                    onClick={() => setIsBreathing(!isBreathing)}
                    className={`w-full py-3 rounded-2xl font-bold text-sm transition-all ${
                      isBreathing ? 'bg-slate-200 text-slate-700' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-md'
                    }`}
                  >
                    {isBreathing ? 'Detener Respiración' : 'Iniciar Respiración Guiada'}
                  </button>
                </div>

              </div>

              {/* Bottom Wellness Row: Water & Stress Tips */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Hydration Tracker */}
                <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <Droplet className="w-4 h-4 text-blue-500" /> Control de Hidratación
                    </h4>
                    <span className="text-xs font-bold text-blue-600">{waterGlasses} / 8 Vasos</span>
                  </div>
                  <p className="text-xs text-slate-500">Mantenerte hidratado mejora tu memoria de trabajo y concentración.</p>
                  
                  <div className="flex items-center justify-between gap-1">
                    {[1,2,3,4,5,6,7,8].map(num => (
                      <button
                        key={num}
                        onClick={() => setWaterGlasses(num)}
                        className={`p-2 rounded-xl transition-all ${
                          num <= waterGlasses ? 'bg-blue-500 text-white shadow-sm' : 'bg-slate-100 text-slate-300'
                        }`}
                      >
                        <Droplet className="w-4 h-4" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stress Tips Banner */}
                <div className="md:col-span-2 bg-slate-900 text-white p-5 rounded-3xl flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-teal-300 text-sm flex items-center gap-2 mb-2">
                      <Award className="w-4 h-4" /> Consejos para Evitar el Cansancio Académico
                    </h4>
                    <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                      <li><strong>Divide grandes proyectos:</strong> Desglosa monografías en tareas diarias pequeñas.</li>
                      <li><strong>Pausas fuera de la pantalla:</strong> Durante tus descansos, evita ver redes sociales; camina o estírate.</li>
                      <li><strong>Sueño reparador:</strong> Dormir 7-8 horas consolida la memoria mejor que estudiar toda la noche.</li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ================= PANTALLA 5: CONTROL DE HORARIOS & BALANCE ================= */}
          {activeTab === 'schedule' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">Control de Horarios & Balance</h2>
                <p className="text-sm text-slate-500">Analiza cómo distribuyes tu tiempo semanal entre Estudio, Trabajo y Descanso</p>
              </div>

              {/* Time Distribution Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-indigo-50 border border-indigo-100 p-5 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Estudio & Clases</span>
                    <BookOpen className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div className="text-2xl font-extrabold text-indigo-900 mt-2">28 hrs/sem</div>
                  <p className="text-[11px] text-indigo-500 mt-1">40% de tu tiempo útil</p>
                </div>

                <div className="bg-amber-50 border border-amber-100 p-5 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Trabajo / Empleo</span>
                    <Briefcase className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="text-2xl font-extrabold text-amber-900 mt-2">20 hrs/sem</div>
                  <p className="text-[11px] text-amber-500 mt-1">28% de tu tiempo útil</p>
                </div>

                <div className="bg-teal-50 border border-teal-100 p-5 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">Tiempo Personal & Descanso</span>
                    <User className="w-5 h-5 text-teal-600" />
                  </div>
                  <div className="text-2xl font-extrabold text-teal-900 mt-2">22 hrs/sem</div>
                  <p className="text-[11px] text-teal-600 mt-1">32% de tu tiempo útil</p>
                </div>
              </div>

              {/* Visual Balance Indicator */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
                <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <BarChart2 className="w-5 h-5 text-indigo-600" /> Indicador de Equilibrio Semanal
                </h3>
                
                {/* Visual Bar */}
                <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
                  <div className="bg-indigo-600 h-full" style={{ width: '40%' }} title="Estudio 40%"></div>
                  <div className="bg-amber-500 h-full" style={{ width: '28%' }} title="Trabajo 28%"></div>
                  <div className="bg-teal-400 h-full" style={{ width: '32%' }} title="Descanso 32%"></div>
                </div>

                <div className="flex flex-wrap items-center justify-around gap-4 text-xs font-semibold pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
                    <span>Estudio (40%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                    <span>Trabajo (28%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-teal-400"></div>
                    <span>Descanso & Personal (32%)</span>
                  </div>
                </div>
              </div>

              {/* Weekly Time Grid Schedule Mock */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm overflow-x-auto">
                <h3 className="font-bold text-slate-900 text-base mb-4">Vista de Bloques Disponibles (Lunes a Viernes)</h3>
                
                <table className="w-full text-xs text-center border-collapse min-w-[500px]">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400">
                      <th className="py-2 text-left">Hora</th>
                      <th className="py-2">Lun</th>
                      <th className="py-2">Mar</th>
                      <th className="py-2">Mié</th>
                      <th className="py-2">Jue</th>
                      <th className="py-2">Vie</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-3 font-semibold text-slate-500 text-left">08:00 - 12:00</td>
                      <td className="p-1"><span className="bg-indigo-100 text-indigo-700 py-1 px-2 rounded-md font-bold block">Clases</span></td>
                      <td className="p-1"><span className="bg-teal-100 text-teal-700 py-1 px-2 rounded-md font-bold block">Estudio</span></td>
                      <td className="p-1"><span className="bg-indigo-100 text-indigo-700 py-1 px-2 rounded-md font-bold block">Clases</span></td>
                      <td className="p-1"><span className="bg-teal-100 text-teal-700 py-1 px-2 rounded-md font-bold block">Libre</span></td>
                      <td className="p-1"><span className="bg-indigo-100 text-indigo-700 py-1 px-2 rounded-md font-bold block">Clases</span></td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold text-slate-500 text-left">13:00 - 17:00</td>
                      <td className="p-1"><span className="bg-amber-100 text-amber-700 py-1 px-2 rounded-md font-bold block">Trabajo</span></td>
                      <td className="p-1"><span className="bg-amber-100 text-amber-700 py-1 px-2 rounded-md font-bold block">Trabajo</span></td>
                      <td className="p-1"><span className="bg-amber-100 text-amber-700 py-1 px-2 rounded-md font-bold block">Trabajo</span></td>
                      <td className="p-1"><span className="bg-amber-100 text-amber-700 py-1 px-2 rounded-md font-bold block">Trabajo</span></td>
                      <td className="p-1"><span className="bg-teal-100 text-teal-700 py-1 px-2 rounded-md font-bold block">Descanso</span></td>
                    </tr>
                    <tr>
                      <td className="py-3 font-semibold text-slate-500 text-left">18:00 - 21:00</td>
                      <td className="p-1"><span className="bg-teal-100 text-teal-700 py-1 px-2 rounded-md font-bold block">Personal</span></td>
                      <td className="p-1"><span className="bg-indigo-100 text-indigo-700 py-1 px-2 rounded-md font-bold block">Proyecto</span></td>
                      <td className="p-1"><span className="bg-teal-100 text-teal-700 py-1 px-2 rounded-md font-bold block">Deporte</span></td>
                      <td className="p-1"><span className="bg-indigo-100 text-indigo-700 py-1 px-2 rounded-md font-bold block">Estudio</span></td>
                      <td className="p-1"><span className="bg-teal-100 text-teal-700 py-1 px-2 rounded-md font-bold block">Social</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 flex justify-around items-center p-2 z-40">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl text-[10px] font-bold transition-all ${
            activeTab === 'home' ? 'text-teal-300' : 'text-slate-400'
          }`}
        >
          <Home className="w-5 h-5" /> Inicio
        </button>
        <button
          onClick={() => setActiveTab('calendar')}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl text-[10px] font-bold transition-all ${
            activeTab === 'calendar' ? 'text-teal-300' : 'text-slate-400'
          }`}
        >
          <Calendar className="w-5 h-5" /> Calendario
        </button>
        <button
          onClick={() => setActiveTab('tasks')}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl text-[10px] font-bold transition-all ${
            activeTab === 'tasks' ? 'text-teal-300' : 'text-slate-400'
          }`}
        >
          <CheckSquare className="w-5 h-5" /> Tareas
        </button>
        <button
          onClick={() => setActiveTab('wellness')}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl text-[10px] font-bold transition-all ${
            activeTab === 'wellness' ? 'text-teal-300' : 'text-slate-400'
          }`}
        >
          <Heart className="w-5 h-5" /> Bienestar
        </button>
        <button
          onClick={() => setActiveTab('schedule')}
          className={`flex flex-col items-center gap-1 p-2 rounded-xl text-[10px] font-bold transition-all ${
            activeTab === 'schedule' ? 'text-teal-300' : 'text-slate-400'
          }`}
        >
          <Clock className="w-5 h-5" /> Horarios
        </button>
      </nav>

      {/* MODAL: AGREGAR TAREA */}
      {showAddTaskModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <h3 className="text-xl font-bold text-slate-900">Agregar Nueva Tarea</h3>
            
            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Título de la tarea</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Entregar Informe de Laboratorio"
                  value={newTask.title}
                  onChange={e => setNewTask({...newTask, title: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Fecha límite</label>
                  <input
                    type="date"
                    required
                    value={newTask.date}
                    onChange={e => setNewTask({...newTask, date: e.target.value})}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Hora</label>
                  <input
                    type="time"
                    required
                    value={newTask.time}
                    onChange={e => setNewTask({...newTask, time: e.target.value})}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Prioridad</label>
                  <select
                    value={newTask.priority}
                    onChange={e => setNewTask({...newTask, priority: e.target.value})}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Alta">Alta</option>
                    <option value="Media">Media</option>
                    <option value="Baja">Baja</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Categoría</label>
                  <select
                    value={newTask.category}
                    onChange={e => setNewTask({...newTask, category: e.target.value})}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Estudio">Estudio</option>
                    <option value="Trabajo">Trabajo</option>
                    <option value="Personal">Personal</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddTaskModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
                >
                  Guardar Tarea
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: AGREGAR EVENTO CALENDARIO */}
      {showAddEventModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4">
            <h3 className="text-xl font-bold text-slate-900">Agregar Evento / Evaluación</h3>
            
            <form onSubmit={handleAddEvent} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Nombre del evento o curso</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Examen Parcial de Física"
                  value={newEvent.title}
                  onChange={e => setNewEvent({...newEvent, title: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Tipo de Evento</label>
                  <select
                    value={newEvent.type}
                    onChange={e => setNewEvent({...newEvent, type: e.target.value})}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Clase">Clase</option>
                    <option value="Examen">Examen</option>
                    <option value="Entrega">Entrega</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Lugar / Plataforma</label>
                  <input
                    type="text"
                    placeholder="Ej. Aula 102 / Zoom"
                    value={newEvent.location}
                    onChange={e => setNewEvent({...newEvent, location: e.target.value})}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Fecha</label>
                  <input
                    type="date"
                    required
                    value={newEvent.date}
                    onChange={e => setNewEvent({...newEvent, date: e.target.value})}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Hora</label>
                  <input
                    type="time"
                    required
                    value={newEvent.time}
                    onChange={e => setNewEvent({...newEvent, time: e.target.value})}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddEventModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
                >
                  Guardar Evento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}