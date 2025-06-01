import { useState, useRef } from 'react';
import '../components/css/Pomodoro.css'; // Importar el archivo CSS para los estilos

export default function Pomodoro() {
  const [activity, setActivity] = useState(25); // Tiempo de actividad predeterminado en minutos
  const [rest, setRest] = useState(5); // Tiempo de descanso predeterminado en minutos
  const [cycles, setCycles] = useState(4); // Número de ciclos predeterminado
  const [timeLeft, setTimeLeft] = useState(activity * 60); // Tiempo restante en segundos
  const [isRunning, setIsRunning] = useState(false); // Estado del temporizador en ejecución
  const intervalRef = useRef(null); // Referencia al intervalo

  function playSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine'; // Tipo de onda
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // Frecuencia en Hz (440 Hz = La)
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5); // Duración de 0.5 segundos
  }

  function handleActivityChange(event) {
    const minutes = parseInt(event.target.value, 10) || 0;
    setActivity(minutes);
    setTimeLeft(minutes * 60); // Actualizar el tiempo restante
  }

  function handleRestChange(event) {
    const minutes = parseInt(event.target.value, 10) || 0;
    setRest(minutes);
  }

  function handleCyclesChange(event) {
    const cycleCount = parseInt(event.target.value, 10) || 0;
    setCycles(cycleCount);
  }

  function startTimer() {
    if (isRunning) return; // Prevenir múltiples intervalos

    setIsRunning(true);
    let totalTime = activity * 60;
    let cyclesLeft = cycles;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          if (cyclesLeft > 1) {
            cyclesLeft--;
            totalTime = rest * 60;
            playSound(); // Reproducir sonido al inicio del descanso
            console.log(`Descanso de ${rest} minutos. Ciclos restantes: ${cyclesLeft}`);
            return totalTime;
          } else {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            console.log("Temporizador finalizado.");
            return 0;
          }
        }
        return prevTime - 1;
      });
    }, 1000);
  }

  function resetTimer() {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setActivity(25);
    setRest(5);
    setCycles(4);
    setTimeLeft(25 * 60);
    console.log("Temporizador reiniciado.");
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="pomodoro">
      <h2>Temporizador Pomodoro</h2>
      <div className='input-row'>
        <label htmlFor="minutesInput">Actividad</label>
        <input type="number" id="minutesInput" placeholder="Actividad" onChange={handleActivityChange} value={activity} />
        <label htmlFor="restInput">Descanso</label>
        <input type="number" id="restInput" placeholder="Descanso" onChange={handleRestChange} value={rest} />
        <label htmlFor="cyclesInput">Ciclos</label>
        <input type="number" id="cyclesInput" placeholder="Ciclos" onChange={handleCyclesChange} value={cycles} />
      </div>
      <button id="startButton" onClick={startTimer} disabled={isRunning}>Iniciar Temporizador</button>
      <div id="timerDisplay">{formatTime(timeLeft)}</div>
      <button id="resetButton" onClick={resetTimer}>Reiniciar Temporizador</button>
    </div>
  );
}