return {
  {
    "ibhagwan/fzf-lua",
    -- optional for icon support
    dependencies = { "nvim-tree/nvim-web-devicons" },
    -- or if using mini.icons/mini.nvim
    -- dependencies = { "echasnovski/mini.icons" },
    opts = {},
    config = function(_, opts)
      require("fzf-lua").setup(opts)

      local set = vim.keymap.set

      -- Find Files Keymaps --
      set("n", "<leader>ff", require("fzf-lua").files, { desc = "[F]ind [F]iles" })
      set("n", "<leader>tr", require("fzf-lua").resume, { desc = "[R]esume last search" })
      set("n", "<leader>fo", require("fzf-lua").buffers, { desc = "[F]ind [O]pen Files" })
      set("n", "<leader>fr", require("fzf-lua").oldfiles, { desc = "[F]ind [R]ecent Files" })
      set("n", "<leader>fs", require("fzf-lua").live_grep_glob, { desc = "[F]ind [S]tring in Files" }) -- Note: with -- separator
      set("n", "<leader>fw", require("fzf-lua").grep_cword, { desc = "[F]ind [W]ord" })
      set("v", "<leader>fw", require("fzf-lua").grep_visual, { desc = "[F]ind [W]ord (in visual selection)" })
      set("n", "<leader>fh", require("fzf-lua").helptags, { desc = "[F]ind [H]elp" })
      set("n", "<leader>fk", require("fzf-lua").keymaps, { desc = "[F]ind [K]eymaps" })
      set("n", "<leader>fc", require("fzf-lua").commands, { desc = "[F]ind [C]ommands" })

      -- LSP Configuration -- TODO: Move somewhere else?
      set(
        "n",
        "gd",
        "<cmd>FzfLua lsp_definitions jump_to_single_result=true ignore_current_line=true<cr>",
        { desc = "[G]o to [D]efinition" }
      )
      set(
        "n",
        "gr",
        "<cmd>FzfLua lsp_references jump_to_single_result=true ignore_current_line=true<cr>",
        { desc = "[G]o to [R]eference" }
      )
      set(
        "n",
        "gy",
        "<cmd>FzfLua lsp_typedefs jump_to_single_result=true ignore_current_line=true<cr>",
        { desc = "Goto T[y]pe Definition" }
      )
      set("n", "R", vim.lsp.buf.rename, { desc = "[R]ename variable" }) -- NOTE Would be cooler if it would work in line
      set("n", "<space>ca", require("fzf-lua").lsp_code_actions, { desc = "[C]ode [A]ctions" })
    end,
  },
}
