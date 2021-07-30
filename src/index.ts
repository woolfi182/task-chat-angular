import { App } from './application';

const defaultPort = 5000;

const getValidPort = (port?: string | number): number => {
    if (!port || isNaN(Number(port))) {
        return defaultPort
    }
    return Number(port)
}


const main = async () => {
    const port = getValidPort(process.env.PORT);
    const app = new App(port);
    await app.init();
}

main().catch(error => {
    console.error(error)
})
