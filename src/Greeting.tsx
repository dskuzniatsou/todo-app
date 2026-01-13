export const Greeting = ({name}: { name: string }) => {
    return (
        <>
            <h1>Hello, {name}!</h1>;
            <h2>Сегодня {new Date().toLocaleDateString('ru-RU')}</h2>
        </>)
}
