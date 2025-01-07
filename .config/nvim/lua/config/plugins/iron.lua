return {
  "Vigemus/iron.nvim",
  config = function()
    require("iron.core").setup({
      config = {
        repl_definition = {
          sh = { command = {
            "bash",
          } },
        },
        repl_open_cmd = require("iron.view").split.vertical.rightbelow(0.42),
      },
      keymaps = {
        send_paragraph = "<space>sp",
        interrupt = "<space>s<space>",
        exit = "<space>sq",
      },
    })
  end,
}
