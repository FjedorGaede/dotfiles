return {
  "echasnovski/mini.splitjoin",
  version = false,
  config = function()
    local splitJoin = require("mini.splitjoin")
    splitJoin.setup({
      mappings = {
        toggle = "<space>j",
      },
    })
  end,
}
