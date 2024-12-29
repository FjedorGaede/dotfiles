return {
  "echasnovski/mini.cursorword",
  config = function()
    -- NOTE: Not sure about this plugin. It also highlights a lot of words I do not want to e.g. in comments
    local cursor_word = require("mini.cursorword")
    cursor_word.setup({
      delay = 0,
    })
    vim.api.nvim_set_hl(0, "MiniCursorword", { bg = "#53576D" }) -- This changes the highlighting for the word
  end,
}
