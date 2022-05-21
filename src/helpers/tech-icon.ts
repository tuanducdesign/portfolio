export function getTechIcon(name: string) {
  switch (name) {
    case 'css':
      return 'devicon-css3-plain colored';
    case 'python':
      return 'devicon-python-plain colored';
    case 'go':
      return 'devicon-go-original-wordmark colored';
  }
}
