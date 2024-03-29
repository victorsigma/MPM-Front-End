﻿CREATE DATABASE [MPMDB]
GO

USE [MPMDB]
GO
/****** Object:  Table [dbo].[Activities]    Script Date: 25/07/2022 02:27:47 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Activities](
	[id] [nvarchar](450) NOT NULL,
	[title] [nvarchar](max) NOT NULL,
	[subtitle] [nvarchar](max) NOT NULL,
	[src] [nvarchar](max) NOT NULL,
	[status] [int] NOT NULL,
	[dateEnd] [datetime2](7) NOT NULL,
	[leader] [bit] NOT NULL,
	[analyst] [bit] NOT NULL,
	[designer] [bit] NOT NULL,
	[programmer] [bit] NOT NULL,
	[projectId] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Activities] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Projects]    Script Date: 25/07/2022 02:27:47 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Projects](
	[id] [nvarchar](450) NOT NULL,
	[title] [nvarchar](max) NOT NULL,
	[subtitle] [nvarchar](max) NOT NULL,
	[src] [nvarchar](max) NOT NULL,
	[dateStart] [datetime2](7) NOT NULL,
	[dateEnd] [datetime2](7) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ProjectsHasUsers]    Script Date: 25/07/2022 02:27:47 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProjectsHasUsers](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[proyectsIdProject] [nvarchar](max) NOT NULL,
	[userIdUser] [nvarchar](max) NOT NULL,
	[rolesIdRol] [int] NOT NULL,
 CONSTRAINT [PK_ProjectsHasUsers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 25/07/2022 02:27:47 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[userId] [nvarchar](450) NOT NULL,
	[userName] [nvarchar](max) NOT NULL,
	[password] [nvarchar](max) NOT NULL,
	[userMail] [nvarchar](max) NOT NULL,
	[phoneNumber] [nvarchar](max) NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[userId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
--MPM
