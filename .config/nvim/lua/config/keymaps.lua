-- Debugging
vim.keymap.set("n", "<space><space>x", "<cmd>source %<CR>")
vim.keymap.set("n", "<space>x", ":.lua<CR>", { silent = true })
vim.keymap.set("v", "<space>x", ":lua<CR>", { silent = true })

-- Remove search highlighting on esc key
vim.keymap.set("n", "<Esc>", ":nohlsearch<CR>", { silent = true })

-- Run Tmux Sessionizer
vim.keymap.set("n", "<C-f>", "<cmd>silent !tmux neww tmux-sessionizer.sh<CR>")
vim.keymap.set("n", "<C-g>", "<cmd>silent !tmux neww tmux-reattach.sh<CR>")

-- NOTE This feels kinda disruptive as it also let's me not use this when I acually want to use it in telescope or completion
-- vim.keymap.set("n", "<C-k>", "<C-w>k")
-- vim.keymap.set("n", "<C-j>", "<C-w>j")
-- vim.keymap.set("n", "<C-h>", "<C-w>h")
-- vim.keymap.set("n", "<C-l>", "<C-w>l")
--

-- REMOVE DEFAULT MAPPINGS --

-- Remove the keymaps as I want to use g differently as a `go to` keymap
local function removeKeymapIfExists(mode, keymap)
  local _, _ = pcall(function()
    vim.keymap.del(mode, keymap)
  end)
end

vim.api.nvim_create_autocmd("LspAttach", {
  callback = function()
    -- Remove these to not interfer with `gr` `Go to Reference` Command
    removeKeymapIfExists("n", "gri")
    removeKeymapIfExists("n", "grr")
    removeKeymapIfExists("n", "gra")
    removeKeymapIfExists("n", "grn")
  end,
})
