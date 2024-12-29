local colors = require("dracula.palette")
vim.api.nvim_set_hl(0, "RenderMarkdownChecked", { fg = colors.green })
vim.api.nvim_set_hl(0, "RenderMarkdownCode", { bg = "#2D333D" })

return {
  "MeanderingProgrammer/render-markdown.nvim",
  enabled = false,
  dependencies = { "nvim-treesitter/nvim-treesitter", "echasnovski/mini.nvim" }, -- if you use the mini.nvim suite
  ---@module 'render-markdown'
  ---@type render.md.UserConfig
  opts = {
    render_modes = { "n", "c", "t" },
    checkbox = {
      position = "overlay",
      unchecked = { icon = "✘ " },
      checked = { icon = "✔ " },
      custom = { todo = { rendered = "◯ " } },
    },
    code = {
      language_pad = 1,
      left_pad = 1,
    },
  },
}
