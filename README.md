# neo-design-patterns-hw-7

Було реалізовано систему генерації документів із підтримкою форматів Markdown, HTML та Plain Text.
Демонструє патерни Composite та Bridge.

1. Структура проекту:
   src/
   ├── interfaces/ # Інтерфейси
   │ ├── DocNode.ts # Базовий інтерфейс для всіх елементів документа
   │ └── DocRenderer.ts # Інтерфейс для рендерерів
   ├── renderers/ # Реалізації рендерерів
   │ ├── BaseRenderer.ts # Базовий клас для рендерерів
   │ ├── HTMLRenderer.ts # HTML формат
   │ ├── MarkdownRenderer.ts # Markdown формат
   │ └── PlainTextRenderer.ts # Простий текст
   ├── nodes/ # Елементи документа
   │ ├── List.ts # Список
   │ ├── Paragraph.ts # Параграф
   │ └── Section.ts # Секція (Composite)
   ├── factories/ # Фабрики
   │ └── RendererFactory.ts # Фабрика для створення рендерерів
   └── main.ts # Точка входу

2. Встановлення
   npm install

3. Запуск
   npx ts-node src/main.ts markdown
   npx ts-node src/main.ts html
   npx ts-node src/main.ts plain

4. Збереження у файл
   npx ts-node src/main.ts markdown output.md
   npx ts-node src/main.ts html output.html
   npx ts-node src/main.ts plain output.txt

5. Структурні патерни
   Composite дозволяє створювати деревоподібні структури об'єктів. Composite реалізовано в класі `Section` (`src/nodes/Section.ts`). Клас `Section` реалізує інтерфейс `DocNode` і містить масив дочірніх
   елементів `DocNode[]`. Це дозволяє будувати документ як дерево довільної глибини. `Section` може містити `Paragraph`, `List` або інші `Section`. Метод `render()` рекурсивно викликає `render()` на кожному дочірньому елементі та об'єднує результати.

Bridge реалізовано через інтерфейс `DocRenderer` (`src/interfaces/DocRenderer.ts`). Кожен елемент документа отримує об'єкт рендерера через конструктор і делегує йому всі рішення про форматування. Структура документа та спосіб його виводу змінюються незалежно одне від одного. Можна додати новий формат, не змінюючи жодного вузла документа, або додати новий тип вузла, не чіпаючи рендерери.
