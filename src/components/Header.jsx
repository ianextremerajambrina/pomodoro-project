import '../components/css/Header.css'; // Importar el archivo CSS para los estilos

export default function Header() {
  return (
    <header className="header">
      <h1>Temporizador</h1>
      <p>Utiliza este temporizador para gestionar tu tiempo de estudio.</p>
      <p>Introduce el tiempo en minutos que desees para actividad y descanso.</p>
      <p>Finalmente, en el apartado 'Ciclos' introduces las veces que desees repetir el pomodoro</p>
    </header>
  );
}