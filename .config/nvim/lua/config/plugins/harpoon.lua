return {
  "ThePrimeagen/harpoon",
  enabled = true,
  branch = "harpoon2",
  dependencies = { "nvim-lua/plenary.nvim", 
 -- "telescope-nvim/telescope.nvim" 
  },
  config = function()
    local harpoon = require("harpoon")
    harpoon:setup({
      settings = {
        save_on_toggle = true,
      },
    })

    -- basic telescope configuration
    -- local conf = require("telescope.config").values
    -- local function toggle_telescope(harpoon_files)
      -- local file_paths = {}
      -- for _, item in ipairs(harpoon_files.items) do
        -- table.insert(file_paths, item.value)
      -- end
-- 
      -- require("telescope.pickers")
        -- .new({}, {
          -- prompt_title = "Harpoon",
          -- finder = require("telescope.finders").new_table({
            -- results = file_paths,
          -- }),
          -- previewer = conf.file_previewer({}),
          -- sorter = conf.generic_sorter({}),
        -- })
        -- :find()

    vim.keymap.set("n", "<leader>hh", function()
      harpoon:list():add()
    end)
    vim.keymap.set("n", "<leader>hm", function()
      harpoon.ui:toggle_quick_menu(harpoon:list())
    end, { desc = "Open harpoon window" })

    vim.keymap.set("n", "<space>ha", function()
      harpoon:list():select(1)
    end)
    vim.keymap.set("n", "<space>hs", function()
      harpoon:list():select(2)
    end)
    vim.keymap.set("n", "<space>hd", function()
      harpoon:list():select(3)
    end)
    vim.keymap.set("n", "<space>hf", function()
      harpoon:list():select(4)
    end)
    vim.keymap.set("n", "<space>hj", function()
      harpoon:list():select(5)
    end)
    vim.keymap.set("n", "<space>hk", function()
      harpoon:list():select(6)
    end)
    vim.keymap.set("n", "<space>hl", function()
      harpoon:list():select(7)
    end)
    vim.keymap.set("n", "<space>hö", function()
      harpoon:list():select(8)
    end)
  end,
}
