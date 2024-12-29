local colors = require("dracula").colors()

vim.opt.laststatus = 3 -- always show statusline

vim.opt.termguicolors = true
vim.opt.number = true

vim.opt.shiftwidth = 4
vim.opt.linebreak = true
vim.opt.cursorline = true

-- Clipboard & Yanking
vim.opt.clipboard = "unnamedplus"

vim.api.nvim_set_hl(0, "YankHighlight", { fg = "#3C3836", bg = colors.pink })
vim.api.nvim_create_autocmd("TextYankPost", {
  desc = "This highlights the yanked text",
  group = vim.api.nvim_create_augroup("highlight-yank", { clear = true }),
  callback = function()
    vim.highlight.on_yank({
      higroup = "YankHighlight",
    })
  end,
})

-- Searching
vim.opt.ignorecase = true -- ignore case when searching
vim.opt.smartcase = true -- if you include mixed case in your search, assumes you want case-sensitive

-- Color
vim.opt.background = "dark" -- colorschemes that can be light or dark will be made dark

-- Column
vim.opt.signcolumn = "yes" -- show sign column so that text does not shift

-- Scrolling Behavior
vim.opt.scrolloff = 10

-- Concealing (for markdown and url shorting)
vim.opt.conceallevel = 2

-- Fonts
vim.g.have_nerd_font = true
