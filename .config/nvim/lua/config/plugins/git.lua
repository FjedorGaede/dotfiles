return {
  {
    "echasnovski/mini-git",
    config = function()
      require("mini.git").setup({})
    end,
  },
  {
    "lewis6991/gitsigns.nvim",
    config = function()
      require("gitsigns").setup({
        numhl = true,
        current_line_blame = true,
        current_line_blame_opts = {
          delay = 0,
        },
        preview_config = {
          border = "rounded",
          style = "minimal",
        },
      })

      vim.keymap.set(
        "n",
        "<leader>gp",
        "<cmd>Gitsigns preview_hunk<CR>",
        { desc = "[G]it [P]review hunk", silent = true }
      )
      vim.keymap.set("n", "]g", "<cmd>Gitsigns next_hunk<CR>", { desc = "[G]it [N]ext hunk", silent = true })
      vim.keymap.set("n", "[g", "<cmd>Gitsigns prev_hunk<CR>", { desc = "[G]it [P]rev hunk", silent = true })
      vim.keymap.set("n", "]G", function()
        require("gitsigns").nav_hunk("next")
        require("gitsigns").preview_hunk()
      end, { desc = "[G]it [N]ext hunk", silent = true })
      vim.keymap.set("n", "[G", function()
        require("gitsigns").nav_hunk("prev")
        require("gitsigns").preview_hunk()
      end, { desc = "[G]it [P]rev hunk", silent = true })
      vim.keymap.set(
        "n",
        "<leader>gz",
        "<cmd>Gitsigns reset_hunk<CR>",
        { desc = "[G]it [Z]urücksetzen hunk", silent = true }
      )
      vim.keymap.set(
        "n",
        "<leader>gZ",
        "<cmd>Gitsigns reset_buffer<CR>",
        { desc = "[G]it [Z]urücksetzen buffer", silent = true }
      )
      vim.keymap.set("n", "<leader>gd", "<cmd>Gitsigns diffthis<CR>", { silent = true })
    end,
  },
  {
    "FabijanZulj/blame.nvim",
    lazy = false,
    opts = {
      blame_options = { "-w" },
      commit_detail_view = "vsplit",
      mappings = {
        stack_push = "l",
        stack_pop = "h",
      },
    },
    config = function(_, opts)
      require("blame").setup(opts)
      vim.keymap.set("n", "<leader>gb", "<cmd>BlameToggle<CR>", { desc = "[G]it [B]lame Toggle", silent = true })
    end,
  },
}
