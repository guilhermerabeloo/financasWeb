export function formatarMoeda(numero_param) {
    const numero = Number(numero_param)

    return numero.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}