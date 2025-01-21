local set = vim.keymap.set

-- Debugging
set("n", "<space><space>x", "<cmd>source %<CR>")
set("n", "<space>x", ":.lua<CR>", { silent = true })
set("v", "<space>x", ":lua<CR>", { silent = true })

-- Remove search highlighting on esc key
set("n", "<Esc>", ":nohlsearch<CR>", { silent = true })

-- Run Tmux Sessionizer
set("n", "<C-f>", "<cmd>silent !tmux neww tmux-sessionizer.sh<CR>")
set("n", "<C-g>", "<cmd>silent !tmux neww tmux-reattach.sh<CR>")

-- Nvim Terminal
vim.keymap.set("t", "<Esc>", [[<C-\><C-n>]])

-- NOTE This feels kinda disruptive as it also let's me not use this when I acually want to use it in telescope or completion
-- set("n", "<C-k>", "<C-w>k")
-- set("n", "<C-j>", "<C-w>j")
-- set("n", "<C-h>", "<C-w>h")
-- set("n", "<C-l>", "<C-w>l")
--

-- REMOVE DEFAULT MAPPINGS --

-- Remove the keymaps as I want to use g differently as a `go to` keymap
local function removeKeymapIfExists(mode, keymap)
  local _, _ = pcall(function()
    del(mode, keymap)
  end)
end

vim.api.nvim_create_autocmd("LspAttach", {
  callback = function()
    -- Remove these to not interfer with `gr` `Go to Reference` Command
    removeKeymapIfExists("n", "gri")
    removeKeymapIfExists("n", "grr")
    removeKeymapIfExists("n", "gra")
    removeKeymapIfExists("n", "grn")

    -- vim.keymap.set("n", "<leader>O", require("lspconfig").vtsls.organize_imports)
    vim.keymap.set("n", "<leader>O", function()
      require("lspconfig").vtsls.organize_imports()
    end)
  end,
})
