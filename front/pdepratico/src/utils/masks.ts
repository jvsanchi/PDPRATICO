export const maskCNPJ = (value: string) => {
  return value
    .replace(/\D/g, "") // Remove caracteres não numéricos
    .replace(/(\d{2})(\d)/, "$1.$2") // Adiciona ponto após os 2 primeiros dígitos
    .replace(/(\d{2})\.(\d{3})(\d)/, "$1.$2.$3") // Adiciona ponto após os 5 primeiros dígitos
    .replace(/\.(\d{3})(\d)/, ".$1/$2") // Adiciona barra após os 8 primeiros dígitos
    .replace(/(\d{4})(\d)/, "$1-$2") // Adiciona hífen após os 12 primeiros dígitos
    .slice(0, 18); // Limita o comprimento
};

export const maskCPF = (value: string) => {
  return value
    .replace(/\D/g, "") // Remove caracteres não numéricos
    .replace(/(\d{3})(\d)/, "$1.$2") // Adiciona ponto após os 3 primeiros dígitos
    .replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3") // Adiciona ponto após os 6 primeiros dígitos
    .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4") // Adiciona hífen após os 9 primeiros dígitos
    .slice(0, 14); // Limita o comprimento
};
