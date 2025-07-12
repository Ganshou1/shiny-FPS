// 创建图表的函数
let mermaidLoaded = false;
let mermaidLoadPromise: Promise<void> | null = null;

// 确保 mermaid 只加载一次的函数
const ensureMermaidLoaded = (): Promise<void> => {
  if (mermaidLoaded) {
    return Promise.resolve();
  }

  if (mermaidLoadPromise) {
    return mermaidLoadPromise;
  }

  mermaidLoadPromise = new Promise((resolve, reject) => {
    try {
      // 检查是否已经有 mermaid 脚本
      if (document.querySelector('script[src*="mermaid"]')) {
        mermaidLoaded = true;
        resolve();
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10.3.1/dist/mermaid.min.js';
      script.async = true;
      script.onload = () => {
        try {
          // @ts-ignore
          window.mermaid.initialize({ 
            startOnLoad: false, 
            theme: 'dark',
            securityLevel: 'loose'
          });
          mermaidLoaded = true;
          resolve();
        } catch (err) {
          reject(err);
        }
      };
      script.onerror = (err) => {
        reject(new Error(`Failed to load Mermaid: ${err}`));
      };
      document.head.appendChild(script);
    } catch (error) {
      reject(error);
    }
  });

  return mermaidLoadPromise;
};

export const createDiagram = async (element: HTMLElement, content: string): Promise<void> => {
  try {
    // 清除元素中的现有内容
    element.innerHTML = '';
    
    // 创建容器
    const container = document.createElement('div');
    container.className = 'mermaid-container';
    container.style.width = '100%';
    container.style.minHeight = '100px';
    
    // 创建 mermaid 代码块
    const codeBlock = document.createElement('pre');
    codeBlock.className = 'mermaid';
    codeBlock.textContent = content.trim();
    container.appendChild(codeBlock);
    element.appendChild(container);

    // 确保 mermaid 已加载
    await ensureMermaidLoaded();
    
    // 等待浏览器绘制 DOM
    await new Promise(resolve => setTimeout(resolve, 0));
    
    try {
      // @ts-ignore
      await window.mermaid.run({
        nodes: [codeBlock]
      });
    } catch (renderError: any) {
      console.error('Mermaid render error:', renderError);
      // 渲染错误时显示错误信息而不是让整个页面崩溃
      const errorDiv = document.createElement('div');
      errorDiv.className = 'mermaid-error';
      errorDiv.style.color = 'red';
      errorDiv.style.padding = '10px';
      errorDiv.style.border = '1px solid red';
      errorDiv.textContent = `图表渲染错误: ${renderError.message || '未知错误'}`;
      container.innerHTML = '';
      container.appendChild(errorDiv);
    }
  } catch (error) {
    console.error('Failed to setup diagram:', error);
    // 显示友好的错误信息
    element.innerHTML = `<div style="color:red;padding:10px;border:1px solid red;">
      无法加载图表库: ${error instanceof Error ? error.message : '未知错误'}
    </div>`;
  }
}; 