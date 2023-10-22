

function generateDarkStyles(color: string) {
    return `
      :is(.dark .dark\:bg-${color}) {
        --tw-bg-opacity: 1;
        background-color: ${color};
      }
    `;
}
