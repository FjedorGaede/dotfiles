# Todos
- [x] Have Completion
- [x] Explore Mini.nvim and choose cool tools
- [x] Have Tree Sidebar -> Decided for using oil.nvim now for now
- [x] Have Telescope
- [x] Explore Snacks.nvim and choose cool tools
- [x] is there a way to write telescope or something with actions like the C-Shift-P command on webstorm? -> actually this is the telescope Commands function that I already have set up. This is the closest we can get
- [x] Use fzf-lua instead of telescope? -> I do not see any reason for this yet. The fzf extension should work 
- [x] code actions -> I have set it to `<space>ca` as I know it to make this easily available
- [x] Have Markdown renderer
- [x] Fullscreen
- [x] Why does K not open in nice dialog like the other stuff? -> This was resolved by just using `noice.nvim` for it
- [x] Why is the "" and '' so bad? it just opens two even infront of variables. This is not what i want. Maybe choose another plugin? -> We tried to use `autopairs.nvim` see how it works out
- [x] Why nothing to rename when renaming was done? Can i also inplace rename as we do it in Webstorm -> Can be done but is kinda laggy I do not like it that much.
- [x] tmux sessionizer integrate
- [x] How can i make that when i press enter inside of brackets that is moves like in webstorm? (There is something broken that i do not know why yet)
- [x] trouble.nvim?
- [x] open help in flaot window?
- [x] Refactor init.lua file
- [x] Why not have icons on the left side but still letters?
- [x] Less jumping when the left side is disappearing in insert mode.
- [x] How to have insert mode also show diagnostics
- [x] Can we have function as a scope? i want to comment out whole functions etc. Also I should just build some kind of playground for stuff like this 
- [x] Why is macro recording not shown??
- [ ] Make the keybinding as I have it in Webstorm
- [ ] help annoys me to always go back and forth. There needs to be a better way
- [ ] color tokens that are the same everythwere? this would be nice. Somehow this should work
- [ ] Nothing to do notify even though it shows me the stuff. When pressing K
- [ ] How can i make a telescope picker `definition-or-references.nvim` for this?

# FZF-Lua 
- [ ] Grep not searching for git ignored files

# Telsescope
- [ ] Can i have custom actions?
- [ ] How does it work with quickfix?
- [ ] How can i close buffers that are open and not needed anymore? 
- [ ] Test lua fzf
- [ ] Find reference always finds stuff two times? -> https://github.com/nvim-telescope/telescope.nvim/pull/3381 when multiple lsps are attached this can happen. There is a workaround somewhere. Which is annyoing
- [ ] When going to a reference try to center the screen?
- [ ] Rename field: Can it be in normal mode instead of insert mode?
- [ ] Show dot files?
- [ ] Have a blacklist of files somewhere? For example for the css modules it would be nice to not show the definitiono of how it works but just the css file (or instantly jump there)

- [ ] mark better that a file is unsaved

# LSP
- [ ] Graphql better integration? Go to references?
- [ ] typescript does not import with type if only type is needed. 

# Blink
- [x] Blink.nvim -> do not have text as completion all the time? -> works pretty well I would assume except for the fucking color -> Actually it is possilbe to set the offset value for the `buffer` provider to some thing really negative to always push it to be latest
- [x] Blink: Add lazydev to as a source  
- [x] Blink: Show the scrollbar more prominent?
- [x] Blink: Fix issue with signature -> Noice overlapped it
- [ ] Blink: Integrate lua snip and friendly snippets?

# unit tests
- [ ] How to run unit tests?

# formatting
- [ ] Backend: Why did it mess up the indentation?
- [ ] How to make format work when auto-indent and format the same? annoying else

# tree
- [x] Have the neotree also instead only oil. I think it still has value to explore the projects like that -> will use mini.files for now

# git
- [x] Make work with git signs, git hunks and move between and reset working nicely and make it easy to work inside that 
- [x] Git inline blame?
- [x] Git Blame -> test the git blame plugin that just does that -> echt cool
- [x] Git history and stuff. -> I think lazygit is good enough for this 
- [x] which one is better? mini.git or fugitive? What do i need what do i want? -> Actually, nothing is really interesting. Mini.git provides info for MiniStatusline and Fugitive is only interesting for the line blame that I can better reproduce with the dedicated nvim plugin. Rest goes via lazygit.

# mini 
- [x] Status line of mini could use a bit of love? Especially the name of the file is super hard to find i think.
- [x] watch this video https://www.youtube.com/watch?v=cNK5kYJ7mrs&t=266s&ab_channel=EvgeniChasnovski
- [x] mini files -> cool and intersting different approach
- [x] mini operators -> sieht schon sehr cool aus. Er sagt in dem video oben, dass sowas wie `gr` sowieso auf einen leader key gehört. vllt hat er damit sogar recht, weil die braucht man ja eher selten im Gegensatz zu sowas vllt? -> irgendwann vllt mal
- [x] auto session -> irgendwie nicht das was ich will
- [x] status line show the file type or attached lsps at least?
- [ ] status line show percentage of file or show a scollbar on the right side? <- Yes please

# Snippets
- [ ] Have custom lua snip
- [ ] Have more info about lua snippets?

## Angular 
- [x] Treesitter for angular inline tempalte not working? -> Doch funktioniert bei mir jetzt
- [x] Angular LSP hat für VSCode noch keinen support für Signals um die anders zu kollorieren... Was eine dumme Scheiße...

