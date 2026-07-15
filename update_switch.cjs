const fs = require('fs');

const file = 'src/components/Latex.tsx';
let content = fs.readFileSync(file, 'utf8');

const casesToAdd = `
        case 'Example23Case1Diagram':
          renderedElements.push(<Example23Case1Diagram key={\`diag-\${i}\`} />);
          break;
        case 'Example23Case2Diagram':
          renderedElements.push(<Example23Case2Diagram key={\`diag-\${i}\`} />);
          break;
        case 'Example24DiagramA':
          renderedElements.push(<Example24DiagramA key={\`diag-\${i}\`} />);
          break;
        case 'Example24DiagramB':
          renderedElements.push(<Example24DiagramB key={\`diag-\${i}\`} />);
          break;
        case 'Example25Diagram':
          renderedElements.push(<Example25Diagram key={\`diag-\${i}\`} />);
          break;
        case 'Example26Diagram':
          renderedElements.push(<Example26Diagram key={\`diag-\${i}\`} />);
          break;
`;

if (!content.includes('case \'Example23Case1Diagram\':')) {
    content = content.replace("default:", casesToAdd + "        default:");
    fs.writeFileSync(file, content);
    console.log("Switch cases added");
} else {
    console.log("Cases already exist");
}
