// Chỉ chạy nếu BrythonRunner tồn tại
if (typeof BrythonRunner !== 'undefined') {
  window.pythonRunner = new BrythonRunner({
    stdout: {
      write(content) {
        window.pythonResult = content;
        window.pythonErr = 0;
      },
      flush() {},
    },
    stderr: {
      write(content) {
        window.pythonResult = content;
        window.pythonErr = 1;
      },
      flush() {},
    },
    stdin: {
      async readline() {
        var userInput = prompt();
        console.log("Received StdIn: " + userInput);
        return userInput;
      },
    },
    onInit() {},
  });
} else {
  console.log("BrythonRunner không được định nghĩa, bỏ qua chức năng Python");
}
